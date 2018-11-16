/**
 * @fileoverview Disallow "./../../" for only "../../"
 * @author Nick McCready
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const message = './../ is not allowed use ../';

module.exports = {
  message,
  meta: {
    docs: {
      description: 'Disallow "./../../" for only "../../"',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },
  create(context) {
    function noImportDotSlashDotDot(node) {
      const hasdotSlashDotDot = /('|")\.\/\.\.\//.test(node.source.raw);
      if (hasdotSlashDotDot) {
        context.report({
          node: node.source,
          message
        });
      }
    }

    return {
      ImportDeclaration: noImportDotSlashDotDot
    };
  }
};
