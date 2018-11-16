/**
 * @fileoverview Allow only camel cased args.
 * @author Nick McCready
 */
const camelCase = require('camel-case');
const { get } = require('lodash');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const message = 'non camel-cased args are not allowed.';

module.exports = {
  message,
  meta: {
    docs: {
      description: 'camelCased function arguments only',
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },
  create(context) {
    function functionCameCasedArgs(_node, isProperties) {
      let node = _node;
      let { params } = node;
      if (isProperties) {
        params = node;
      }
      /* eslint-disable function-paren-newline */
      if (!params.find) {
        return;
      }
      const nonCamelCased = params.find((arg) => {
        // check assignments as well
        const name =
          get(arg, 'name') ||
          get(arg, ['left', 'name']) ||
          get(arg, ['key', 'name']);

        if (!name && arg.properties) {
          // console.warn(arg.properties);
          // console.warn(arg.properties[0]);
          return functionCameCasedArgs(arg.properties, true);
        }
        if (!name || !name.replace) {
          return undefined;
        }
        /*
        allowed:
          - _val
          - val
          - ClassVal
          - ValClass
        */
        const ret =
          camelCase(name) !== name.replace(/^_/, '').replace(/\$$/, '') &&
          !/.*Class.*/.test(name) &&
          !/.*Component.*/.test(name) &&
          !/.*Comp.*/.test(name);
        if (ret && isProperties) {
          node = arg;
        }
        return ret;
      });
      /* eslint-enable function-paren-newline */

      if (nonCamelCased) {
        context.report({
          node,
          message
        });
      }
    }

    return {
      FunctionDeclaration: functionCameCasedArgs,
      FunctionExpression: functionCameCasedArgs,
      ArrowFunctionExpression: functionCameCasedArgs
    };
  }
};
