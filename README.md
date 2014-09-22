# husky [![Build Status](https://travis-ci.org/typicode/husky.svg?branch=master)](https://travis-ci.org/typicode/husky) [![](http://img.shields.io/npm/dm/husky.svg)](https://www.npmjs.org/package/husky)

> husky prevents bad commit or push using Git hooks.

:dog: woof!

```bash
$ npm install husky --save-dev
```

```javascript
// package.json
{
  "scripts": {
    "precommit": "npm test",
    "prepush": "npm test"
  }
}
```

```bash
git commit -m "Keep calm and commit"
```

_Both npm scripts are optional, existing hooks aren't replaced and adding `--no-verify` to your git commands lets you bypass hooks._

_To uninstall husky, simply run `npm rm husky --save-dev`_.

_Other supported hook: `post-merge`_
