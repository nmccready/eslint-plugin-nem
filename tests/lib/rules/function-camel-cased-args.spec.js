/**
 * @author Nick McCready
 */

const RuleTester = require('../RuleTester');
const rule = require('../../../lib/rules/function-camel-cased-args');

const ruleTester = new RuleTester();
const { message } = rule;
const error = () => ({ errors: [{ message }] });

ruleTester.run('function-camel-cased-args', rule, {
  valid: [
    // FunctionDeclaration
    'function crap(crapOne) {}',
    'function crap(crapOne = \'1\') {}',
    'function crap(_val) {}',
    'function crap(_val = \'two\') {}',
    'function crap(_val = \'two\', twoVal = \'three\') {}',
    'function crap(crapOne, crapTwo) {}',
    'function crap(crapOne, crapTwo, ClassHi) {}',
    'function crap(crapOne, crapTwo, HiClass) {}',
    // FunctionExpression
    'const crap = function (crapOne) {};',
    'const crap = function crap(crapOne) {};',
    'const crap = function (crapOne, crapTwo, crapThree) {};',
    'const crap = function (crapOne, ClassHi) {};',
    'const crap = function (crapOne, HiClass) {};',
    // ArrowFunctionExpression
    'const crap = (crapOne) => {};',
    'const crap = (crapOne, crapTwo) => {}',
    'const crap = (crapOne, crapTwo, crapThree) => {}',
    'const crap = (crapOne, ClassHi) => {}',
    'const crap = (crapOne, HiClass) => {}',
    'const crap = (crapOne, Class) => {}',
    'function ChartWrapper(ChartToDisplayComponent, chartParamaters, chartStyles) {}',
    'function ChartWrapper(ChartToDisplayComp, chartParamaters, chartStyles) {}',
    'const crap = (action$) => {}'
  ],

  invalid: [
    // FunctionDeclaration
    { code: 'function crap(CrapOne) {}', ...error() },
    { code: 'function crap(CrapOne = \'1\') {}', ...error() },
    { code: 'function crap({ crapOne = \'1\', CrapTwo = \'1\'}) {}', ...error() },
    { code: 'function crap(CrapOne, CrapTwo) {}', ...error() },
    { code: 'function crap(crapOne, CrapTwo) {}', ...error() },
    { code: 'function crap(crapOne, crapTwo, CrapThree) {}', ...error() },
    {
      code: 'function crap(crapOne, crapTwo, CrapThree, KlasOne) {}',
      ...error()
    },
    // FunctionExpression
    { code: 'const crap = function crap(CrapOne) {};', ...error() },
    { code: 'const crap = function (CrapOne) {};', ...error() },
    // ArrowFunctionExpression
    { code: 'const crap = (CrapOne) => {};', ...error() },
    { code: 'const crap = (crapOne, CrapTwo) => {};', ...error() },
    {
      code: '[].forEach((crapOne, CrapTwo) => console.warn(crapOne, crapTwo));',
      ...error()
    }
  ]
});
