// @ts-check
const {Elf} = require('xcraft-core-goblin');
const {string} = require('xcraft-core-stones');
const {CodeMiner} = require('./codeMiner.js');

class AppMinerShape {
  id = string;
}

class ChestState extends Elf.Sculpt(AppMinerShape) {}

class AppMinerLogic extends Elf.Spirit {
  state = new ChestState({
    id: 'appMiner',
  });
}

class AppMiner extends Elf.Alone {
  async init() {
    const minerConfig = require('xcraft-core-etc')().load('goblin-miner');

    const feedId = await this.newQuestFeed();

    const {provider, model, host, authKey} = minerConfig.agent;
    const {temperature, seed} = minerConfig.inference;
    const {doc: genDoc, readme: genReadme} = minerConfig.generate;
    const {doc: modulesDoc, readme: modulesReadme} = minerConfig.modules;
    const {doc: file} = minerConfig.instruct;
    const {doc: excludesDoc} = minerConfig.excludes;
    const {doc: excludesReadme} = minerConfig.excludes;

    // Not in package.json (needed only when using AppMiner)
    const {projectPath} = require('xcraft-core-host');

    const codeMiner = await new CodeMiner(this).create(
      `codeMiner@appMiner`,
      feedId,
      projectPath,
      provider,
      model,
      host,
      authKey,
      temperature,
      seed
    );

    if (genDoc) {
      await codeMiner.generateDocumentation(modulesDoc, file, excludesDoc);
    }
    if (genReadme) {
      await codeMiner.generateReadme(modulesReadme, excludesReadme);
    }

    this.quest.cmd('shutdown');
  }
}

module.exports = {AppMiner, AppMinerLogic};
