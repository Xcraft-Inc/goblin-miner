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
    type: 'list',
    name: 'modules.doc',
    message: 'Modules and filters',
    default: [],
  },
  {
    type: 'list',
    name: 'instructs.doc',
    message: 'Filenames for specific instructions',
    default: [],
  },
];
