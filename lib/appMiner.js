// @ts-check
const {Elf} = require('xcraft-core-goblin');
const {string} = require('xcraft-core-stones');
const path = require('node:path');
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

    const feedId = Elf.createFeed();
    this.quest.defer(async () => await this.killFeed(feedId));

    const {provider, model, host, authKey} = minerConfig.agent;
    const {temperature, seed} = minerConfig.inference;
    const {doc: genDoc, readme: genReadme} = minerConfig.generate;
    const {doc: modulesDoc, readme: modulesReadme} = minerConfig.modules;

    const projectPath = path.resolve(__dirname, '../../..');

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
      await codeMiner.generateDocumentation(modulesDoc);
    }
    if (genReadme) {
      await codeMiner.generateReadme(modulesReadme);
    }
  }
}

module.exports = {AppMiner, AppMinerLogic};
