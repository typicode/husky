# husky

> Git hooks made easy

[![](https://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![Mac/Linux Build Status](https://img.shields.io/travis/typicode/husky/dev.svg?label=Mac%20OSX%20%26%20Linux)](https://travis-ci.org/typicode/husky) [![Windows Build status](https://img.shields.io/appveyor/ci/typicode/husky/dev.svg?label=Windows)](https://ci.appveyor.com/project/typicode/husky/dev)

Husky can prevent bad `git commit`, `git push` and more 🐶 ❤️ _woof!_

_To all the amazing people who have answered the Husky survey, thanks so much <3 !_

<a href="https://www.patreon.com/typicode">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## Install

```sh
npm install husky --save-dev
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

To go further, see the docs [here](https://github.com/typicode/husky/blob/master/DOCS.md).

## Uninstall

```sh
npm uninstall husky
```

## Upgrading from 0.14

If you're upgrading from `0.14`, simply move your hooks to `husky.hooks` field:

```diff
{
  "scripts": {
-   "precommit": "npm test",
-   "commitmsg": "commitlint -E GIT_PARAMS"
  },
+ "husky": {
+   "hooks": {
+     "pre-commit": "npm test",
+     "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
+   }
+ }
}
```

Or run the following command which will do the same automatically for you ;)

```
./node_modules/.bin/husky-upgrade
```

Alternatively, you can also use any of the files/formats that are supported by [cosmiconfig](https://github.com/davidtheclark/cosmiconfig). This means that you can place your husky hooks config in a `.huskyrc` file or export them from a `husky.config.js` file as well. Cosmiconfig supports `.js`, `.json`, and `.yaml` file formats.

To view the full list of changes, please see the [CHANGELOG](https://github.com/typicode/husky/blob/master/CHANGELOG.md).

## Features

* Keeps existing user hooks
* Supports GUI Git clients
* Supports all Git hooks (`pre-commit`, `pre-push`, ...)

## Used by

* [jQuery](https://github.com/jquery/jquery)
* [babel](https://github.com/babel/babel)
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [Next.js](https://github.com/zeit/next.js)
* [Hyper](https://github.com/zeit/hyper)
* [Kibana](https://github.com/elastic/kibana)
* [JSON Server](https://github.com/typicode/json-server)
* [Hotel](https://github.com/typicode/hotel)
* ... and 25k+ [other awesome repos](https://libraries.io/npm/husky/dependent-repositories)

## See also

* [pkg-ok](https://github.com/typicode/pkg-ok) - Prevents publishing a module with bad paths or incorrect line endings
* [please-upgrade-node](https://github.com/typicode/please-upgrade-node) - Show a message to upgrade Node instead of a stacktrace in your CLIs
* [react-fake-props](https://github.com/typicode/react-fake-props) - Fake props for your React tests

## License

MIT

[Patreon](https://www.patreon.com/typicode) - [Supporters](https://thanks.typicode.com) ✨
