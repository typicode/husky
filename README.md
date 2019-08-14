---

# Announcement

__Important__ you can support the development of v4 major release on [__Open Collective__](https://opencollective.com/husky) and [__GitHub Sponsors__](https://github.com/users/typicode/sponsorship).

See [next](https://github.com/typicode/husky/tree/next) branch. Feedback is welcome 🙏

---

# Husky

[![Financial Contributors on Open Collective](https://opencollective.com/husky/all/badge.svg?label=financial+contributors)](https://opencollective.com/husky) [![](https://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![Mac/Linux Build Status](https://img.shields.io/travis/typicode/husky/master.svg?label=Mac%20OSX%20%26%20Linux)](https://travis-ci.org/typicode/husky) [![Windows Build status](https://img.shields.io/appveyor/ci/typicode/husky/master.svg?label=Windows)](https://ci.appveyor.com/project/typicode/husky)

> Git hooks made easy

Husky can prevent bad `git commit`, `git push` and more 🐶 _woof!_

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

Git hooks installed by husky will be removed.

## Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/husky/contribute)]

### Individuals

<a href="https://opencollective.com/husky"><img src="https://opencollective.com/husky/individuals.svg?width=890"></a>

### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/husky/contribute)]

<a href="https://opencollective.com/husky/organization/0/website"><img src="https://opencollective.com/husky/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/husky/organization/1/website"><img src="https://opencollective.com/husky/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/husky/organization/2/website"><img src="https://opencollective.com/husky/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/husky/organization/3/website"><img src="https://opencollective.com/husky/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/husky/organization/4/website"><img src="https://opencollective.com/husky/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/husky/organization/5/website"><img src="https://opencollective.com/husky/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/husky/organization/6/website"><img src="https://opencollective.com/husky/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/husky/organization/7/website"><img src="https://opencollective.com/husky/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/husky/organization/8/website"><img src="https://opencollective.com/husky/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/husky/organization/9/website"><img src="https://opencollective.com/husky/organization/9/avatar.svg"></a>

## Requirements

Husky requires Node `>= 8.6.0` and Git `>= 2.13.2`

## Upgrading from 0.14

Simply move your existing hooks to `husky.hooks` field and use raw Git hooks names. Also, if you're using the `GIT_PARAMS` env variable, rename it to `HUSKY_GIT_PARAMS`.

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

Alternatively, you can run the following command which will do the same automatically for you ;)

```
./node_modules/.bin/husky-upgrade
```

Starting with `1.0.0`, you can also configure hooks using `.huskyrc`, `.huskyrc.json` or `.huskyrc.js` file.

```js
// .huskyrc
{
  "hooks": {
    "pre-commit": "npm test"
  }
}
```

To view the full list of changes, please see the [CHANGELOG](https://github.com/typicode/husky/blob/master/CHANGELOG.md).

## Features

* Keeps existing user hooks
* Supports GUI Git clients
* Supports all Git hooks (`pre-commit`, `pre-push`, ...)

## Used by

* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [Next.js](https://github.com/zeit/next.js)
* [Hyper](https://github.com/zeit/hyper)
* [Kibana](https://github.com/elastic/kibana)
* [JSON Server](https://github.com/typicode/json-server)
* [Hotel](https://github.com/typicode/hotel)
* ... and many other awesome projects

## See also

* [pkg-ok](https://github.com/typicode/pkg-ok) - Prevents publishing a module with bad paths or incorrect line endings
* [please-upgrade-node](https://github.com/typicode/please-upgrade-node) - Show a message to upgrade Node instead of a stacktrace in your CLIs
* [pinst](https://github.com/typicode/pinst) - dev only postinstall hook

### Patreon

People and companies supporting via Patreon: [thanks](https://thanks.typicode.com)

## License

MIT
