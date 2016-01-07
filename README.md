# husky [![](http://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![npm version](https://badge.fury.io/js/husky.svg)](http://badge.fury.io/js/husky) [![Build Status](https://travis-ci.org/typicode/husky.svg?branch=master)](https://travis-ci.org/typicode/husky)

> Git hooks made easy

Husky can prevent bad commit, push and more :dog: woof!

## Usage

```
npm install husky --save-dev
```

```javascript
// package.json
{
  "scripts": {
    "precommit": "npm test",
    "prepush": "npm test",
    "...": "..."
  }
}
```

```bash
git commit -m "Keep calm and commit"
```

Existing hooks aren't replaced and adding `--no-verify` to your git commands lets you bypass hooks.

You can use any Git hook:

| Git hook | npm script |
| -------- | ---------- |
| applypatch-msg | applypatchmsg |
| commit-msg | commitmsg |
| post-applypatch | postapplypatch |
| post-checkout | postcheckout |
| post-commit | postcommit |
| post-merge | postmerge |
| post-receiv | postreceiv |
| pre-applypatch | preapplypatch |
| pre-commit | precommit |
| pre-push | prepush |
| pre-rebase | prerebase |
| pre-receive | prereceive |
| prepare-commit-msg | preparecommitmsg |
| update | update |

To uninstall husky and Git hooks, simply run:

````
npm uninstall husky --save-dev
```

## License

MIT - [typicode](https://github.com/typicode)
