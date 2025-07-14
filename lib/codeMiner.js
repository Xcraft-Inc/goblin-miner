// @ts-check
const {Elf} = require('xcraft-core-goblin');

const {AiAgent} = require('goblin-agents/lib/llm/aiAgent.js');
const fse = require('fs-extra');
const path = require('node:path');
const {string} = require('xcraft-core-stones');
const {resourcesPath, projectPath} = require('xcraft-core-host');

async function _load(libPath, kind, type, fileName, requiring) {
  const returnValue = async (location) =>
    requiring ? require(location) : await fse.readFile(location, 'utf8');

  let location;
  /* Target module */
  location = path.join(libPath, 'doc/autogen', kind, fileName);
  if (await fse.pathExists(location)) {
    return await returnValue(location);
  }
  /* App resources */
  if (path.resolve(resourcesPath) !== path.resolve(projectPath)) {
    location = path.join(resourcesPath, kind, type, fileName);
    if (await fse.pathExists(location)) {
      return await returnValue(location);
    }
  }
  /* Miner */
  location = path.join(__dirname, kind, type, fileName);
  if (await fse.pathExists(location)) {
    return await returnValue(location);
  }
  location = path.join(__dirname, kind, type, 'base' + path.extname(fileName));
  if (await fse.pathExists(location)) {
    return await returnValue(location);
  }

  return requiring ? () => true : '';
}

async function loadPrompt(libPath, type, name) {
  return await _load(libPath, 'prompts', type, name + '.md', false);
}

async function loadInstruction(libPath, type, name) {
  return await _load(libPath, 'instructions', type, name + '.md', false);
}

async function loadFilter(libPath, type, name) {
  return await _load(libPath, 'filters', type, name + '.js', true);
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
    case 'json':
      return !file.name.endsWith('.json');
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

    case 'cxx':
      return (
        file.name !== 'Makefile' &&
        file.name !== 'CMakeLists.txt' &&
        !file.name.endsWith('.c') &&
        !file.name.endsWith('.cxx') &&
        !file.name.endsWith('.cpp') &&
        !file.name.endsWith('.h') &&
        !file.name.endsWith('.hxx') &&
        !file.name.endsWith('.cxproj') &&
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
    this._type = type || 'xcraft';

    this.logic.create(id);
    return this;
  }

  async loadModule(module, instructFileName) {
    const libPath = path.isAbsolute(module)
      ? module
      : path.join(this._projectPath, 'lib', module);

    let excludes = [];
    try {
      const mignore = await fse.readFile(
        path.join(libPath, '.mignore'),
        'utf8'
      );
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
     * Glob is NOT SUPPORTED
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
    if (this._type === 'translate') {
      return this._generateTranslation(module, instructFile);
    }
    return this._generateDocumentation(module, instructFile);
  }

  async _loadFinalPrompt(libPath, instructName) {
    const sysPrompt = await loadPrompt(libPath, this._type, instructName);
    const sysInstruct = await loadInstruction(
      libPath,
      this._type,
      instructName
    );
    return sysPrompt + '\n\n' + sysInstruct;
  }

  async _generateTranslation(module, instructFile) {
    this.log.dbg('Generating translation...');

    const instructFileName = path.basename(instructFile);
    const instructName = instructFileName.split('.').slice(0, -1).join('.');
    const libPath = path.isAbsolute(module)
      ? module
      : path.join(this._projectPath, 'lib', module);

    const finalPrompt = await this._loadFinalPrompt(libPath, instructName);

    const agentId = `aiAgent@translate-expert`;
    const agentDef = {...this._agentDef, ...{prompt: finalPrompt}};
    const feedId = await this.newQuestFeed();
    const scriptAnalyser = await new AiAgent(this).create(
      agentId,
      feedId,
      agentDef
    );
    await scriptAnalyser.patch(agentDef);

    const absolute = path.isAbsolute(instructFile)
      ? instructFile
      : path.resolve(instructFile);
    const source = await fse.readFile(absolute, 'utf-8');

    const prompt = '# Document à traduire :\n\n' + source;

    const res = await scriptAnalyser.gen(prompt);

    const output = path.join(path.dirname(absolute), instructName + '.en.md');
    await fse.writeFile(output, res);

    this.log.dbg('Generating translation...[DONE]');
  }

  async _generateDocumentation(module, instructFile) {
    this.log.dbg('Generating documentation...');

    const moduleName = path.basename(module);
    const instructFileName = path.basename(instructFile);
    const instructName = instructFileName.split('.').slice(0, -1).join('.');
    const libPath = path.isAbsolute(module)
      ? module
      : path.join(this._projectPath, 'lib', module);

    const finalPrompt = await this._loadFinalPrompt(libPath, instructName);
    const sysFilter = await loadFilter(libPath, this._type, instructName);

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
      const content = await fse.readFile(filePath, 'utf-8');
      prompt += `## Fichier : ${path.relative(libPath, filePath)}\n\n`;
      prompt += `\`\`\`${path.extname(filePath).slice(1)}\n`;
      prompt += content;
      prompt += '```\n\n';
    }

    let mdFilePath;

    /* Always absolute whe CodeMiner is used via the command line */
    if (path.isAbsolute(instructFile)) {
      mdFilePath = instructFile;
    } else {
      const docPath = path.join(this._projectPath, 'doc/autogen/', moduleName);
      await fse.mkdirp(docPath);

      mdFilePath = path.join(docPath, instructFileName);

      if (
        !(await fse.pathExists(mdFilePath)) &&
        (await fse.pathExists(path.join(docPath, `${instructName}.redirect`)))
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

    if (await fse.pathExists(mdFilePath)) {
      const content = await fse.readFile(mdFilePath, 'utf-8');
      prompt += `## DOCUMENT précédent\n\n`;
      prompt += '```md\n';
      prompt += content;
      prompt += '```\n\n';
    }

    const res = await scriptAnalyser.gen(prompt);
    await fse.writeFile(mdFilePath, res);

    this.log.dbg('Generating documentation...[DONE]');
  }
}

module.exports = {CodeMiner, CodeMinerLogic};
