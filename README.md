# husky [![](http://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![npm version](https://badge.fury.io/js/husky.svg)](https://www.npmjs.com/package/husky) [![Build Status](https://travis-ci.org/typicode/husky.svg?branch=master)](https://travis-ci.org/typicode/husky)

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

_If you're migrating from `ghooks`, simply run `npm uninstall ghooks --save-dev && npm install husky --save-dev` and edit `package.json`. Husky will automatically migrate `ghooks` hooks._

## Used by

* [jQuery](https://github.com/jquery/jquery)
* [Next.js](https://github.com/zeit/next.js)
* [Hyper](https://github.com/zeit/hyper)
* [Paper.js](https://github.com/paperjs/paper.js)
* [Kibana](https://github.com/elastic/kibana)
* [JSON Server](https://github.com/typicode/json-server)
* [Hotel](https://github.com/typicode/hotel)
* ... and almost 4000 [other awesome projects](https://libraries.io/npm/husky/dependent-repositories).

## Uninstall

```bash
npm uninstall husky --save-dev
```

## Tricks

<details>

### Debug hooks easily

If you need to debug hooks, simply use `npm run <script-name>`. For example:

```bash
npm run precommit
```

### Git GUI clients support

If you've installed Node using the [standard installer](https://nodejs.org/en/), [nvm](https://github.com/creationix/nvm) or [homebrew](http://brew.sh/), Git hooks will be executed in GUI applications.

### Working with multiple version of Node

If [`nvm`](https://github.com/creationix/nvm) is installed, husky will try to use the `default`/`current` installed Node version or use the project `.nvmrc`.

__Tip__ to use the system-installed version of node, `nvm` provides a [`system`](https://github.com/creationix/nvm#system-version-of-node) alias

### Accessing Git params

Git params can be found in `GIT_PARAMS` environment variable.

### Setting a different log level

By default, husky will run scripts using `--silent` to make the output more readable. If you want to override this, simply pass a different log level to your scripts: 

```json
"precommit": "npm run some-script -q"
```

_`-q/--quiet` is equivalent to `--loglevel warn` which is npm default log level._

### Git submodule support

Yes

### Cygwin support

Yes

### Yarn support

Please use `yarn` `v0.24+`

</details>

## See also

* [pkg-ok](https://github.com/typicode/pkg-ok) - prevents publishing modules with bad paths

## License

MIT - [Typicode :cactus:](https://github.com/typicode)
