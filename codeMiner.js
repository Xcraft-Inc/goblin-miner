const {Elf} = require('xcraft-core-goblin');
const {CodeMiner, CodeMinerLogic} = require('./lib/codeMiner.js');

exports.xcraftCommands = Elf.birth(CodeMiner, CodeMinerLogic);
