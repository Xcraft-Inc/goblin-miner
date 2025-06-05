// @ts-check
const {Elf} = require('xcraft-core-goblin');
const {string} = require('xcraft-core-stones');
const {CodeMiner} = require('./codeMiner.js');
const path = require('node:path');

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
    try {
      await this.main();
    } finally {
      this.quest.cmd('shutdown');
    }
  }

  async main() {
    const minerConfig = require('xcraft-core-etc')().load('goblin-miner');

    const feedId = await this.newQuestFeed();

    let {provider, model, host, authKey} = minerConfig.agent;
    const {temperature, seed} = minerConfig.inference;
    let {doc: modules} = minerConfig.modules;
    let {doc: files} = minerConfig.instructs;
    let type = 'xcraft';

    // Not in package.json (needed only when using AppMiner)
    let {projectPath, appArgs} = require('xcraft-core-host');

    /* -t, --type; -k, --authKey; -i, --input; -o, --output */
    const {t, k, i, o} = appArgs();
    if (t) {
      type = t;
    }
    if (k) {
      authKey = k;
    }
    if (i) {
      modules = [path.resolve(i)];
    }
    if (o) {
      files = [path.resolve(o)];
    }

    const codeMiner = await new CodeMiner(this).create(
      `codeMiner@appMiner`,
      feedId,
      projectPath,
      type,
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
  }
}

module.exports = {AppMiner, AppMinerLogic};
