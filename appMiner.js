const {Elf} = require('xcraft-core-goblin');
const {AppMiner, AppMinerLogic} = require('./lib/appMiner.js');

exports.xcraftCommands = Elf.birth(AppMiner, AppMinerLogic);
