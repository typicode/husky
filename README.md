# husky [![](http://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![npm version](https://badge.fury.io/js/husky.svg)](http://badge.fury.io/js/husky) [![Build Status](https://travis-ci.org/typicode/husky.svg?branch=master)](https://travis-ci.org/typicode/husky)

> Git hooks made easy

Husky can prevent bad commit, push and more :dog: _woof!_

## Install

```sh
npm install husky --save-dev
```


```javascript
// Edit package.json
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

_Existing hooks aren't replaced and you can use [any Git hook](HOOKS.md)._

## Used by

* [jQuery](https://github.com/jquery/jquery)
* [Next.js](https://github.com/zeit/next.js)
* [Hyper](https://github.com/zeit/hyper)
* [Paper.js](https://github.com/paperjs/paper.js)
* [Kibana](https://github.com/elastic/kibana)
* [JSON Server](https://github.com/typicode/json-server)
* [Hotel](https://github.com/typicode/hotel)
* ... and more than 2000+ [other awesome projects](https://libraries.io/npm/husky/dependent-repositories).

## Uninstall

```bash
npm uninstall husky --save-dev
yarn remove husky --dev
```

## Tricks and FAQ

<details>

### Debug hooks easily

If you need to debug hooks, use `npm run <script-name>`, for example:

```bash
npm run precommit
```

### Git GUI clients support

If you've installed Node using the [standard installer](https://nodejs.org/en/), [nvm](https://github.com/creationix/nvm) or [homebrew](http://brew.sh/), git hooks will be executed even in GUI applications.

In the case of [`nvm`](https://github.com/creationix/nvm), husky will try to use the `default` installed version or use the project `.nvmrc`.

### Accessing Git params

Git params can be found in `GIT_PARAMS` environment variable.

### Cygwin support

Yes :)

### Yarn

For Yarn, you currently need to pass `--force` to be sure that hooks are going to be installed (`yarn add husky --dev --force`). You can also manually install hooks using `node node_modules/husky/bin/install`.

</details>

## License

MIT - [Typicode :cactus:](https://github.com/typicode)
