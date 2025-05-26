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
    default: [],
  },
  {
    type: 'input',
    name: 'instruct.doc',
    message: 'Filename for specific instructions',
    default: undefined,
  },
  {
    type: 'input',
    name: 'excludes.doc',
    message: 'Name exclusions',
    default: [],
  },
];
