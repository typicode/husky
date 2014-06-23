# husky [![NPM version](https://badge.fury.io/js/husky.svg)](http://badge.fury.io/js/husky) [![Build Status](https://travis-ci.org/typicode/husky.svg?branch=master)](https://travis-ci.org/typicode/husky)

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

Both npm scripts are optional, existing hooks aren't replaced and adding `-n` to your git commands lets you bypass hooks.

To uninstall husky, simply run `npm rm husky --save-dev`.
