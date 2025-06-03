// @ts-check
const {Elf} = require('xcraft-core-goblin');
const {string} = require('xcraft-core-stones');
const {CodeMiner} = require('./codeMiner.js');

class AppMinerShape {
  id = string;
}

class AppMinerState extends Elf.Sculpt(AppMinerShape) {}

class AppMinerLogic extends Elf.Spirit {
  state = new AppMinerState({
    id: 'appMiner',
  });
}

class AppMiner extends Elf.Alone {
  async init() {
    const minerConfig = require('xcraft-core-etc')().load('goblin-miner');

    const feedId = await this.newQuestFeed();

    const {provider, model, host, authKey} = minerConfig.agent;
    const {temperature, seed} = minerConfig.inference;
    const {doc: modules} = minerConfig.modules;
    const {doc: files} = minerConfig.instructs;

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

    for (const module of modules) {
      for (const file of files) {
        await codeMiner.generate(module, file);
      }
    }

    this.quest.cmd('shutdown');
  }
}

module.exports = {AppMiner, AppMinerLogic};
