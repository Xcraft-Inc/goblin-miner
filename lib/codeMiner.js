// @ts-check
const {Elf} = require('xcraft-core-goblin');

const {AiAgent} = require('goblin-agents/lib/llm/aiAgent.js');
const fse = require('fs-extra');
const path = require('node:path');
const {string} = require('xcraft-core-stones');
const {resourcesPath, projectPath} = require('xcraft-core-host');

function _load(libPath, kind, type, fileName, requiring) {
  const returnValue = (location) =>
    requiring ? require(location) : fse.readFileSync(location, 'utf8');

  let location;
  /* Target module */
  location = path.join(libPath, 'doc/autogen', kind, fileName);
  if (fse.existsSync(location)) {
    return returnValue(location);
  }
  /* App resources */
  if (path.resolve(resourcesPath) !== path.resolve(projectPath)) {
    location = path.join(resourcesPath, kind, type, fileName);
    if (fse.existsSync(location)) {
      return returnValue(location);
    }
  }
  /* Miner */
  location = path.join(__dirname, kind, type, fileName);
  if (fse.existsSync(location)) {
    return returnValue(location);
  }
  location = path.join(__dirname, kind, type, 'base' + path.extname(fileName));
  if (fse.existsSync(location)) {
    return returnValue(location);
  }

  return requiring ? () => true : '';
}

function loadPrompt(libPath, type, name) {
  return _load(libPath, 'prompts', type, name + '.md', false);
}

function loadInstruction(libPath, type, name) {
  return _load(libPath, 'instructions', type, name + '.md', false);
}

function loadFilter(libPath, type, name) {
  return _load(libPath, 'filters', type, name + '.js', true);
}

class CodeMinerShape {
  id = string;
}

class CodeMinerState extends Elf.Sculpt(CodeMinerShape) {}

class CodeMinerLogic extends Elf.Spirit {
  state = new CodeMinerState();

  create(id) {
    const {state} = this;
    state.id = id;
  }
}

function typeFilter(type, file) {
  switch (type) {
    case 'xcraft':
      return (
        (!file.name.endsWith('.js') &&
          file.name !== 'package.json' &&
          path.basename(file.parentPath) !== 'bin') ||
        file.parentPath.includes('node_modules') ||
        file.name.startsWith('eslint.')
      );

    case 'dotnet':
      return (
        !file.name.endsWith('.cs') &&
        !file.name.endsWith('.csproj') &&
        !file.name.endsWith('.sln')
      );

    default:
      return false;
  }
}

class CodeMiner extends Elf {
  logic = Elf.getLogic(CodeMinerLogic);
  state = new CodeMinerState();

  _projectPath;
  _agentDef;
  _type;

  async create(
    id,
    desktopId,
    projectPath,
    type,
    provider,
    model,
    host,
    authKey,
    temperature,
    seed
  ) {
    this._projectPath = projectPath;
    this._agentDef = {
      provider,
      prompt: '',
      model,
      host,
      headers: {Authorization: `Bearer ${authKey}`},
      options: {temperature, seed},
    };
    this._type = type;

    this.logic.create(id);
    return this;
  }

  async loadModule(module, instructFileName) {
    const libPath = path.isAbsolute(module)
      ? module
      : path.join(this._projectPath, 'lib', module);

    let excludes = [];
    try {
      const mignore = fse.readFileSync(path.join(libPath, '.mignore'), 'utf8');
      mignore
        .split('\n')
        .map((entry) => entry.trim())
        .filter((entry) => !!entry)
        .filter((entry) => !entry.startsWith('#'))
        .forEach((entry) => excludes.push(entry));
    } catch {
      /* ... */
    }

    /* Support section like:
     *   toto.js
     *   tata/
     *   [README.md]
     *   service.js
     */
    let skip = false;
    for (let i = 0; i < excludes.length; ++i) {
      const exclude = excludes[i];
      if (exclude.startsWith('[')) {
        skip = exclude !== `[${instructFileName}]`;
        excludes.splice(i, 1);
        i = --i;
        continue;
      }
      if (skip) {
        excludes.splice(i, 1);
        i = --i;
      }
    }

    const domainFiles = fse
      .readdirSync(libPath, {withFileTypes: true, recursive: true})
      .filter((file) => !file.isDirectory());
    const sources = [];
    for (const file of domainFiles) {
      if (typeFilter(this._type, file)) {
        continue;
      }
      if (
        excludes
          .filter((exclude) => !exclude.endsWith('/')) //
          .includes(file.name)
      ) {
        continue;
      }
      if (
        excludes
          .filter((exclude) => exclude.endsWith('/'))
          .some((exclude) =>
            path
              .relative(libPath, file.parentPath)
              .includes(exclude.split('/').slice(0, -1).join(path.sep))
          )
      ) {
        continue;
      }
      sources.push(path.join(file.parentPath, file.name));
    }
    return sources;
  }

  async generate(module, instructFile = 'README.md') {
    this.log.dbg('Generating documentation...');

    const moduleName = path.basename(module);
    const instructFileName = path.basename(instructFile);
    const instructName = instructFileName.split('.').slice(0, -1).join('.');
    const libPath = path.isAbsolute(module)
      ? module
      : path.join(this._projectPath, 'lib', module);

    const sysPrompt = loadPrompt(libPath, this._type, instructName);
    const sysInstruct = loadInstruction(libPath, this._type, instructName);
    const sysFilter = loadFilter(libPath, this._type, instructName);
    const finalPrompt = sysPrompt + '\n\n' + sysInstruct;

    const agentId = `aiAgent@doc-expert`;
    const agentDef = {...this._agentDef, ...{prompt: finalPrompt}};
    const feedId = await this.newQuestFeed();
    const scriptAnalyser = await new AiAgent(this).create(
      agentId,
      feedId,
      agentDef
    );
    await scriptAnalyser.patch(agentDef);

    let prompt = '';

    let sources = await this.loadModule(module, instructFileName);
    sources = sources.filter(sysFilter);
    this.log.dbg(`${sources.length} files to analyze`);

    prompt = `# Module ${moduleName}\n\n`;
    for (const filePath of sources) {
      const content = fse.readFileSync(filePath, 'utf-8');
      prompt += `## Fichier : ${path.relative(libPath, filePath)}\n\n`;
      prompt += `\`\`\`${path.extname(filePath).slice(1)}\n`;
      prompt += content;
      prompt += '```\n\n';
    }

    let mdFilePath;

    if (path.isAbsolute(instructFile)) {
      mdFilePath = instructFile;
    } else {
      const docPath = path.join(this._projectPath, 'doc/autogen/', moduleName);
      fse.mkdirpSync(docPath);

      mdFilePath = path.join(docPath, instructFileName);

      if (
        !fse.existsSync(mdFilePath) &&
        fse.existsSync(path.join(docPath, `${instructName}.redirect`))
      ) {
        const moduleDir = path.join(this._projectPath, 'lib', moduleName);
        if (instructName === 'README') {
          mdFilePath = path.join(moduleDir, instructFileName);
        } else {
          mdFilePath = path.join(moduleDir, 'doc', instructFileName);
        }
      }
    }

    this.log.dbg(`${mdFilePath}...`);

    if (fse.existsSync(mdFilePath)) {
      const content = fse.readFileSync(mdFilePath, 'utf-8');
      prompt += `## DOCUMENT précédent\n\n`;
      prompt += '```md\n';
      prompt += content;
      prompt += '```\n\n';
    }

    const res = await scriptAnalyser.gen(prompt);
    fse.writeFileSync(mdFilePath, res);

    this.log.dbg('Generating documentation...[DONE]');
  }
}

module.exports = {CodeMiner, CodeMinerLogic};
