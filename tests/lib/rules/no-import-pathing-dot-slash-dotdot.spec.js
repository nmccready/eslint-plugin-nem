/**
 * @fileoverview Disallow &#34;./../../&#34; for only &#34;../../&#34;
 * @author Nick McCready
 */

const RuleTester = require('../RuleTester');
const rule = require('../../../lib/rules/no-import-pathing-dot-slash-dotdot');

const ruleTester = new RuleTester();

ruleTester.run('no-import-pathing-dot-slash-dotdot', rule, {
  valid: [
    {
      code: "import { func } from '../../someModule'"
    },
    {
      code: 'import { func } from "../../someModule"'
    }
  ],

  invalid: [
    {
      code: "import { func } from './../../someModule'",
      errors: [
        {
          message: rule.message
        }
      ]
    },
    {
      code: 'import { func } from "./../../someModule"',

      errors: [
        {
          message: rule.message
        }
      ]
    }
  ]
});
