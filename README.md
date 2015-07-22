# husky [![](http://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![npm version](https://badge.fury.io/js/husky.svg)](http://badge.fury.io/js/husky) [![Build Status](https://travis-ci.org/typicode/husky.svg?branch=master)](https://travis-ci.org/typicode/husky)

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
    "prepush": "npm test",
    "prerebase": "npm test",
    "postmerge": "npm install",
    "postrewrite": "npm install"
  }
}
```

```bash
git commit -m "Keep calm and commit"
```

All scripts are optional, existing hooks aren't replaced and adding `--no-verify` to your git commands lets you bypass hooks.

To uninstall husky, simply run `npm rm husky --save-dev`.

Supported hooks are listed [here](hooks) (simply remove `-` when adding them to your `package.json`)
