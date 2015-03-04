# husky [![](http://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![Build Status](https://travis-ci.org/typicode/husky.svg?branch=master)](https://travis-ci.org/typicode/husky) [![npm version](https://badge.fury.io/js/husky.svg)](http://badge.fury.io/js/husky)

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
    "postmerge": "npm install"
  }
}
```

```bash
git commit -m "Keep calm and commit"
```

_All scripts are optional, existing hooks aren't replaced and adding `--no-verify` to your git commands lets you bypass hooks._

_To uninstall husky, simply run `npm rm husky --save-dev`_.

Missing a Git hook? Feel free to create an [issue](https://github.com/typicode/husky/issues).
