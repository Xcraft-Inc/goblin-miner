// @ts-check
const {Elf} = require('xcraft-core-goblin');

const {AiAgent} = require('goblin-agents/lib/llm/aiAgent.js');
const fse = require('fs-extra');
const path = require('node:path');
const {string} = require('xcraft-core-stones');
const {resourcesPath} = require('xcraft-core-host');

function loadPrompt(fileName) {
  return fse.readFileSync(path.join(__dirname, 'prompts', fileName), 'utf8');
}

function loadInstruction(fileName) {
  let instructsPath = path.join(resourcesPath, fileName);
  if (fse.existsSync(instructsPath)) {
    return fse.readFileSync(instructsPath, 'utf8');
  }
  instructsPath = path.join(__dirname, 'instructions', fileName);
  return fse.readFileSync(instructsPath, 'utf8');
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

class CodeMiner extends Elf {
  logic = Elf.getLogic(CodeMinerLogic);
  state = new CodeMinerState();

  _projectPath;
  _agentDef;

  async create(
    id,
    desktopId,
    projectPath,
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

    this.logic.create(id);
    return this;
  }

  async loadModule(goblinName, excludes) {
    const libPath = path.join(this._projectPath, 'lib', goblinName);
    const domainFiles = fse
      .readdirSync(libPath, {withFileTypes: true, recursive: true})
      .filter((file) => !file.isDirectory());
    const sources = [];
    for (const file of domainFiles) {
      if (
        (!file.name.endsWith('.js') &&
          file.name !== 'package.json' &&
          path.basename(file.parentPath) !== 'bin') ||
        file.parentPath.includes('node_modules') ||
        file.name.startsWith('eslint.')
      ) {
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
            file.parentPath.includes(
              exclude.split('/').slice(0, -1).join(path.sep)
            )
          )
      ) {
        continue;
      }
      sources.push(path.join(file.parentPath, file.name));
    }
    return sources;
  }

  async generate(modules, instructFile = 'README.md', excludes = []) {
    this.log.dbg('Generating documentation...');

    const feedId = await this.newQuestFeed();

    const sysPrompt = loadPrompt('base.md');
    const sysInstruct = loadInstruction(instructFile);
    const finalPrompt = sysPrompt + '\n\n' + sysInstruct;

    const agentId = `aiAgent@doc-expert`;
    const agentDef = {
      ...this._agentDef,
      ...{
        prompt: finalPrompt,
      },
    };
    const scriptAnalyser = await new AiAgent(this).create(
      agentId,
      feedId,
      agentDef
    );
    await scriptAnalyser.patch(agentDef);

    let prompt = '';

    for (const module of modules) {
      const sources = await this.loadModule(module, excludes);
      prompt = `# Module ${module}\n\n`;
      for (const filePath of sources) {
        const content = fse.readFileSync(filePath, 'utf-8');
        prompt += `## source : ${filePath}\n\n`;
        prompt += '```js\n';
        prompt += content;
        prompt += '```\n\n';
      }

      const docPath = path.join(this._projectPath, 'doc/autogen/', module);
      fse.mkdirpSync(docPath);

      const fileName = instructFile;
      let mdFilePath = path.join(docPath, fileName);
      if (
        !fse.existsSync(mdFilePath) &&
        fse.existsSync(path.join(docPath, `${fileName}.redirect`))
      ) {
        mdFilePath = path.join(this._projectPath, 'lib', module, fileName);
      }
      this.log.dbg(`${mdFilePath}...`);

      if (fse.existsSync(mdFilePath)) {
        const content = fse.readFileSync(mdFilePath, 'utf-8');
        prompt += `## README précédent\n\n`;
        prompt += '```md\n';
        prompt += content;
        prompt += '```\n\n';
      }

      const res = await scriptAnalyser.gen(prompt);
      fse.writeFileSync(mdFilePath, res);
    }
    this.log.dbg('Generating documentation...[DONE]');
  }
}

module.exports = {CodeMiner, CodeMinerLogic};
