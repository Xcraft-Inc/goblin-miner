'use strict';

module.exports = [
  {
    type: 'input',
    name: 'agent.provider',
    message: 'AI provider',
    default: null,
  },
  {
    type: 'input',
    name: 'agent.model',
    message: 'AI model',
    default: null,
  },
  {
    type: 'input',
    name: 'agent.host',
    message: 'Provider host',
    default: null,
  },
  {
    type: 'input',
    name: 'agent.authKey',
    message: 'Authentification key',
    default: null,
  },
  {
    type: 'input',
    name: 'inference.temperature',
    message: 'Inference temperature',
    default: null,
  },
  {
    type: 'input',
    name: 'inference.seed',
    message: 'Inference seed',
    default: null,
  },
  {
    type: 'input',
    name: 'modules.doc',
    message: 'Modules and filters',
    default: {},
  },
  {
    type: 'input',
    name: 'modules.readme',
    message: 'Modules',
    default: [],
  },
  {
    type: 'input',
    name: 'generate.doc',
    message: 'Enable to generate a document by file',
    default: false,
  },
  {
    type: 'input',
    name: 'generate.readme',
    message: 'Enable to generate a README for the module',
    default: false,
  },
];
