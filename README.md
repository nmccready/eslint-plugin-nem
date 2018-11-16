# eslint-plugin-nem

```js
module.exports = {
  plugins: ['@znemz/nem'],
  '@znemz/nem/no-import-pathing-dot-slash-dotdot': 2
  ...
}
```

## Workflow

Refer to the guide [Creating an ESLint Plugin](https://medium.com/@btegelund/creating-an-eslint-plugin-87f1cb42767f).

### Scaffolding for rule creation

```bash
yarn yo eslint:rule
? What is your name? ...
? Where will this rule be published? ESLint Plugin
? What is the rule ID? no-full-fp-lib
? Type a short description of this rule: ...
? Type a short example of the code that will fail: var _ = require('your favorite fp library');
```
