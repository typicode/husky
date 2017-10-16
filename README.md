# husky [![](http://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![npm version](https://badge.fury.io/js/husky.svg)](https://www.npmjs.com/package/husky) [![Mac/Linux Build Status](https://img.shields.io/travis/typicode/husky/master.svg?label=Mac%20OSX%20%26%20Linux)](https://travis-ci.org/typicode/husky) [![Windows Build status](https://img.shields.io/appveyor/ci/typicode/husky/master.svg?label=Windows)](https://ci.appveyor.com/project/typicode/husky/branch/master)

> Git hooks made easy

_beta branch, see [master](https://github.com/typicode/husky) for stable release documentation_

Husky can prevent bad `git commit`, `git push` and more :dog: _woof!_

## Install

```sh
npm install husky@beta --save-dev
```

```js
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm test",
      "...": "..."
    }
  }
}
```

```sh
git commit -m 'Keep calm and commit'
```

## Uninstall

```sh
npm uninstall husky
```

## Upgrade

If you're upgrading from `0.14` simply move your hooks to `"husky"` field.

```diff
{
  "scripts": {
-    "precommit": "npm test"
  },
+  "husky": {
+    "hooks": {
+      "pre-commit": "npm test"
+    }
+  }
}
```

## Configure

By default, husky expects your project's `package.json` and your `.git` directory to be at the same level. It can be configured to support monorepos or sub-directories.

Check [documentation](docs.md) for more.

## Features

* Fast, minimalist and simple
* Keeps existing user hooks
* Supports GUI Git clients
* Supports all Git hooks (`pre-commit`, `pre-push`, ...)
* Supports monorepo/sub-directories layouts
* If you were using `ghooks`, it will migrate your Git hooks

## Used by

* [jQuery](https://github.com/jquery/jquery)
* [babel](https://github.com/babel/babel)
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [Next.js](https://github.com/zeit/next.js)
* [Hyper](https://github.com/zeit/hyper)
* [Kibana](https://github.com/elastic/kibana)
* [JSON Server](https://github.com/typicode/json-server)
* [Hotel](https://github.com/typicode/hotel)
* ... and over 10k+ [other awesome repos](https://libraries.io/npm/husky/dependent-repositories).

## See also

* [pkg-ok](https://github.com/typicode/pkg-ok) - Prevents publishing modules with bad paths
* [please-upgrade-node](https://github.com/typicode/please-upgrade-node) - Show a message to upgrade Node instead of a stacktrace in your CLIs
* [react-fake-props](https://github.com/typicode/react-fake-props) - Fake props for your React tests

## License

MIT - [Typicode :cactus:](https://github.com/typicode) - [Patreon](https://www.patreon.com/typicode)
