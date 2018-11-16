// thanks to
// https://github.com/xtuc/webassemblyjs/pull/223/files
const { RuleTester } = require('eslint');

RuleTester.setDefaultConfig({
  parser: 'babel-eslint'
});

module.exports = RuleTester;
