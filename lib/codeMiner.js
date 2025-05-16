// @ts-check
const {Elf} = require('xcraft-core-goblin');

const {AiAgent} = require('goblin-agents/lib/llm/aiAgent.js');
const fse = require('fs-extra');
const path = require('node:path');
const {string} = require('xcraft-core-stones');

function loadPrompt(fileName) {
  return fse.readFileSync(path.join(__dirname, 'prompts', fileName), 'utf8');
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

  async loadDomain(goblinName, filters) {
    const libPath = path.join(this._projectPath, 'lib', goblinName);
    const domainFiles = fse
      .readdirSync(libPath, {withFileTypes: true, recursive: true})
      .filter((file) => !file.isDirectory());
    const sources = {};
    for (const file of domainFiles) {
      if (!file.name.endsWith('.js')) {
        continue;
      }
      const filter = path.basename(file.parentPath);
      if (!filters.includes(filter)) {
        continue;
      }
      if (!sources[filter]) {
        sources[filter] = [];
      }
      sources[filter].push(path.join(file.parentPath, file.name));
    }
    return sources;
  }

  async loadModule(goblinName) {
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
      sources.push(path.join(file.parentPath, file.name));
    }
    return sources;
  }

  async generateDocumentation(modules) {
    this.log.dbg('Generating documentation...');

    const feedId = await this.newQuestFeed();

    const sysPrompt = loadPrompt('codeAnalyser.md');
    const agentId = `aiAgent@doc-expert`;
    const agentDef = {...this._agentDef, ...{prompt: sysPrompt}};
    const scriptAnalyser = await new AiAgent(this).create(
      agentId,
      feedId,
      agentDef
    );
    await scriptAnalyser.patch(agentDef);

    for (const [module, filters] of Object.entries(modules)) {
      //keep up2date
      const sources = await this.loadDomain(module, filters);
      const prompts = {};
      for (const [domain, filePaths] of Object.entries(sources)) {
        prompts[domain] = `# Domaine ${domain}`;
        for (const filePath of filePaths) {
          const content = fse.readFileSync(filePath, 'utf-8');
          prompts[domain] += `## source : ${filePath}\n`;
          prompts[domain] += '```js\n';
          prompts[domain] += content;
          prompts[domain] += '```\n';
        }
      }
      const docPath = path.join(this._projectPath, 'doc/autogen/', module);
      fse.mkdirpSync(docPath);
      for (const [folderFilter, prompt] of Object.entries(prompts)) {
        let finalPrompt = prompt;
        let fileName = '';
        switch (folderFilter) {
          case 'lib':
            fileName = 'module';
            break;
          default:
            fileName = folderFilter;
        }
        const mdFilePath = path.join(docPath, `${fileName}.md`);
        this.log.dbg(`${mdFilePath}...`);
        if (fse.existsSync(mdFilePath)) {
          const content = fse.readFileSync(mdFilePath, 'utf-8');
          finalPrompt += `## Documentation précédente\n`;
          finalPrompt += '```md\n';
          finalPrompt += content;
          finalPrompt += '```\n';
        }
        const res = await scriptAnalyser.gen(finalPrompt);
        fse.writeFileSync(mdFilePath, res);
      }
    }
    this.log.dbg('Generating documentation...[DONE]');
  }

  async generateReadme(modules) {
    this.log.dbg('Generating README...');

    const feedId = await this.newQuestFeed();

    const sysPrompt = loadPrompt('codeReadme.md');
    const agentId = `aiAgent@doc-expert`;
    const agentDef = {...this._agentDef, ...{prompt: sysPrompt}};
    const scriptAnalyser = await new AiAgent(this).create(
      agentId,
      feedId,
      agentDef
    );
    await scriptAnalyser.patch(agentDef);

    let prompt = '';

    for (const module of modules) {
      const sources = await this.loadModule(module);
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

      const fileName = 'README';
      let mdFilePath = path.join(docPath, `${fileName}.md`);
      if (
        !fse.existsSync(mdFilePath) &&
        fse.existsSync(path.join(docPath, `${fileName}.redirect`))
      ) {
        mdFilePath = path.join(
          this._projectPath,
          'lib',
          module,
          `${fileName}.md`
        );
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
    this.log.dbg('Generating README...[DONE]');
  }
}

module.exports = {CodeMiner, CodeMinerLogic};
