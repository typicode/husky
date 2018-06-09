# Important: looking for your feedback, [husky survey](https://goo.gl/forms/rvSbDFhR5jLcwDGn2) ❤️

# husky [![](https://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![Mac/Linux Build Status](https://img.shields.io/travis/typicode/husky/dev.svg?label=Mac%20OSX%20%26%20Linux)](https://travis-ci.org/typicode/husky) [![Windows Build status](https://img.shields.io/appveyor/ci/typicode/husky/dev.svg?label=Windows)](https://ci.appveyor.com/project/typicode/husky/dev)

> Git hooks made easy

Husky can prevent bad `git commit`, `git push` and more :dog: _woof!_

_You're viewing the documentation for the next version of husky, click [here](https://github.com/typicode/husky/tree/v0.14.3) if you prefer to view docs for the stable version (`v0.14.3`)_

## Install

```sh
npm install husky@next --save-dev
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

Check [documentation](https://github.com/typicode/husky/blob/dev/docs.md) for more.

## Uninstall

```sh
npm uninstall husky
```

## Upgrading from 0.14

If you're upgrading from `0.14`, simply move your hooks to `husky.hooks`:

```diff
{
  "scripts": {
-   "precommit": "npm test"
  },
+ "husky": {
+   "hooks": {
+     "pre-commit": "npm test"
+   }
+ }
}
```

Or run the following command which will do the same automatically for you ;)

```
./node_modules/.bin/husky-upgrade
```

Alternatively, you can also use any of the files/formats that are supported by [cosmiconfig](https://github.com/davidtheclark/cosmiconfig). This means that you can place your husky hooks config in a `.huskyrc` file or export them from a `husky.config.js` file as well. Cosmiconfig supports `js`, `json`, and `yaml` file formats.

## Features

* Keeps existing user hooks
* Supports GUI Git clients
* Supports all Git hooks (`pre-commit`, `pre-push`, ...)
* Auto-migrates Git hooks installed by `ghooks`

## Used by

* [jQuery](https://github.com/jquery/jquery)
* [babel](https://github.com/babel/babel)
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [Next.js](https://github.com/zeit/next.js)
* [Hyper](https://github.com/zeit/hyper)
* [Kibana](https://github.com/elastic/kibana)
* [JSON Server](https://github.com/typicode/json-server)
* [Hotel](https://github.com/typicode/hotel)
* ... and 21k+ [other awesome repos](https://libraries.io/npm/husky/dependent-repositories) :tada:

## See also

* [pkg-ok](https://github.com/typicode/pkg-ok) - Prevents publishing a module with bad paths or incorrect line endings
* [please-upgrade-node](https://github.com/typicode/please-upgrade-node) - Show a message to upgrade Node instead of a stacktrace in your CLIs
* [react-fake-props](https://github.com/typicode/react-fake-props) - Fake props for your React tests

## License

MIT - [Typicode :cactus:](https://github.com/typicode) - [Patreon](https://www.patreon.com/typicode)
