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

    const options = {};
    Object.assign(options, minerConfig.agent);
    Object.assign(options, minerConfig.inference);
    options.modules = minerConfig.modules.doc;
    options.instructs = minerConfig.instructs.doc;

    // Not in package.json (needed only when using AppMiner)
    const {projectPath, appArgs} = require('xcraft-core-host');

    /*
     * -t, --type         (default: xcraft) (choices: xcraft, dotnet)
     * -p, --provider     (default: open-ai) (choices: open-ai, ollama)
     * -m. --model        (default: anthropic/claude-sonnet-4)
     * -H, --host         (default: https://openrouter.ai/api/v1)
     * -k, --authKey
     * -T, --temperature  (default: 0.2)
     * -s, --seed         (default: 21121871)
     * -i, --input
     * -o, --output
     */
    const args = appArgs();
    const mapping = {
      t: 'type',
      p: 'provider',
      m: 'model',
      H: 'host',
      k: 'authKey',
      s: 'seed',
      T: 'temperature',
      i: 'modules',
      o: 'instructs',
    };
    for (const [arg, key] of Object.entries(mapping)) {
      if (args[arg] === undefined || args[arg] === null) {
        continue;
      }
      options[key] =
        arg === 'i' || arg === 'o' //
          ? [path.resolve(args[arg])]
          : args[arg];
    }

    const codeMiner = await new CodeMiner(this).create(
      `codeMiner@appMiner`,
      feedId,
      projectPath,
      options.type,
      options.provider,
      options.model,
      options.host,
      options.authKey,
      options.temperature,
      options.seed
    );

    for (const module of options.modules) {
      for (const instruct of options.instructs) {
        await codeMiner.generate(module, instruct);
      }
    }
  }
}

module.exports = {AppMiner, AppMinerLogic};
