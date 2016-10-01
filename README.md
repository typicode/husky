# husky [![](http://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![npm version](https://badge.fury.io/js/husky.svg)](http://badge.fury.io/js/husky) [![Build Status](https://travis-ci.org/typicode/husky.svg?branch=master)](https://travis-ci.org/typicode/husky)

> Git hooks made easy

Husky can prevent bad commit, push and more :dog: _woof!_

_Used by [jQuery](https://github.com/jquery/jquery), [HyperTerm](https://github.com/zeit/hyperterm), [Paper.js](https://github.com/paperjs/paper.js), [Kibana](https://github.com/elastic/kibana), [JSON Server](https://github.com/typicode/json-server), [Hotel](https://github.com/typicode/hotel), ... and many other awesome projects._

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

Existing hooks aren't replaced and adding `--no-verify` to your git commands lets you bypass hooks. You can also use [any Git hook](HOOKS.md).  Optionally include the environment variable `$GIT_PARAMS` in your scripts to access any command-line parameters provided by git.

## Tips

### Debug

If you need to debug hooks, use `npm run <script-name>`, for example:

```bash
npm run precommit
```

### GUI applications

If you've installed Node using the [standard installer](https://nodejs.org/en/), [nvm](https://github.com/creationix/nvm) or [homebrew](http://brew.sh/), git hooks will be executed even in GUI applications.

### NVM

If you're using [nvm](https://github.com/creationix/nvm), husky will try to use the `default` installed version or use the project `.nvmrc` file.

### Uninstall

To uninstall husky and Git hooks, simply run:

```bash
npm uninstall husky --save-dev
```

## License

MIT - [typicode](https://github.com/typicode)
