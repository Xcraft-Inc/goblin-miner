'use strict';

const fse = require('fs-extra');

module.exports = function (file) {
  const data = fse.readFileSync(file, 'utf8');
  return /(TODO|FIXME|XXX)/.test(data);
};
