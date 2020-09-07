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

_Existing hooks are kept. Requires Node `>= 10` and Git `>= 2.13.0`._

## Reinstall

If Husky is already in your `node_modules` or `pnp.js` (Yarn 2) and you want to reinstall hooks, you can run `npm rebuild` or `yarn rebuild`.

## Uninstall

```sh
npm uninstall husky
```

_Git hooks installed by husky will be removed._

## Financial Contributors

Become a financial contributor and help us sustain our community ❤️ [[Contribute](https://opencollective.com/husky/contribute)]

### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/husky/contribute)]

<!-- oc -->
#### Gold Sponsors ($500+ / month)

<a href="https://opencollective.com/husky/tiers/gold-sponsor/0/website"><img src="https://opencollective.com/husky/tiers/gold-sponsor/0/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/gold-sponsor/1/website"><img src="https://opencollective.com/husky/tiers/gold-sponsor/1/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/gold-sponsor/2/website"><img src="https://opencollective.com/husky/tiers/gold-sponsor/2/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/gold-sponsor/3/website"><img src="https://opencollective.com/husky/tiers/gold-sponsor/3/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/gold-sponsor/4/website"><img src="https://opencollective.com/husky/tiers/gold-sponsor/4/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/gold-sponsor/5/website"><img src="https://opencollective.com/husky/tiers/gold-sponsor/5/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/gold-sponsor/6/website"><img src="https://opencollective.com/husky/tiers/gold-sponsor/6/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/gold-sponsor/7/website"><img src="https://opencollective.com/husky/tiers/gold-sponsor/7/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/gold-sponsor/8/website"><img src="https://opencollective.com/husky/tiers/gold-sponsor/8/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/gold-sponsor/9/website"><img src="https://opencollective.com/husky/tiers/gold-sponsor/9/avatar.svg" height="60px"></a>

#### Silver Sponsors ($250+ / month)

<a href="https://opencollective.com/husky/tiers/silver-sponsor/0/website"><img src="https://opencollective.com/husky/tiers/silver-sponsor/0/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/silver-sponsor/1/website"><img src="https://opencollective.com/husky/tiers/silver-sponsor/1/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/silver-sponsor/2/website"><img src="https://opencollective.com/husky/tiers/silver-sponsor/2/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/silver-sponsor/3/website"><img src="https://opencollective.com/husky/tiers/silver-sponsor/3/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/silver-sponsor/4/website"><img src="https://opencollective.com/husky/tiers/silver-sponsor/4/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/silver-sponsor/5/website"><img src="https://opencollective.com/husky/tiers/silver-sponsor/5/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/silver-sponsor/6/website"><img src="https://opencollective.com/husky/tiers/silver-sponsor/6/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/silver-sponsor/7/website"><img src="https://opencollective.com/husky/tiers/silver-sponsor/7/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/silver-sponsor/8/website"><img src="https://opencollective.com/husky/tiers/silver-sponsor/8/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/silver-sponsor/9/website"><img src="https://opencollective.com/husky/tiers/silver-sponsor/9/avatar.svg" height="60px"></a>

#### Bronze Sponsors ($100+ / month)

<a href="https://opencollective.com/husky/tiers/bronze-sponsor/0/website"><img src="https://opencollective.com/husky/tiers/bronze-sponsor/0/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/bronze-sponsor/1/website"><img src="https://opencollective.com/husky/tiers/bronze-sponsor/1/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/bronze-sponsor/2/website"><img src="https://opencollective.com/husky/tiers/bronze-sponsor/2/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/bronze-sponsor/3/website"><img src="https://opencollective.com/husky/tiers/bronze-sponsor/3/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/bronze-sponsor/4/website"><img src="https://opencollective.com/husky/tiers/bronze-sponsor/4/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/bronze-sponsor/5/website"><img src="https://opencollective.com/husky/tiers/bronze-sponsor/5/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/bronze-sponsor/6/website"><img src="https://opencollective.com/husky/tiers/bronze-sponsor/6/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/bronze-sponsor/7/website"><img src="https://opencollective.com/husky/tiers/bronze-sponsor/7/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/bronze-sponsor/8/website"><img src="https://opencollective.com/husky/tiers/bronze-sponsor/8/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/bronze-sponsor/9/website"><img src="https://opencollective.com/husky/tiers/bronze-sponsor/9/avatar.svg" height="60px"></a>
<!-- oc-end -->

### Individuals

<a href="https://opencollective.com/husky"><img src="https://opencollective.com/husky/individuals.svg?width=890" height="200px"></a>

## Used by

* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* ... and many other awesome projects

## Guides

<!-- toc -->

  * [Upgrading from 0.14](#upgrading-from-014)
  * [Supported hooks](#supported-hooks)
  * [Access Git params and stdin](#access-git-params-and-stdin)
  * [Skip all hooks (rebase)](#skip-all-hooks-rebase)
  * [Disable auto-install](#disable-auto-install)
  * [CI servers](#ci-servers)
  * [Monorepos](#monorepos)
  * [Node version managers](#node-version-managers)
  * [Local commands (~/.huskyrc)](#local-commands-huskyrc)
  * [Multiple commands](#multiple-commands)
  * [Troubleshoot](#troubleshoot)
    + [Debug messages](#debug-messages)
    + [Hooks aren't running](#hooks-arent-running)
    + [Commits aren't blocked](#commits-arent-blocked)
    + [Commits are slow](#commits-are-slow)
    + [Testing husky in a new repo](#testing-husky-in-a-new-repo)
    + [ENOENT error 'node_modules/husky/.git/hooks'](#enoent-error-node_moduleshuskygithooks)

<!-- tocstop -->

### Upgrading from 0.14

Run `husky-upgrade` to automatically upgrade your configuration:

```
npx --no-install husky-upgrade
```

You can also do it manually. Move your existing hooks to `husky.hooks` field and use raw Git hooks names. Also, if you were using `GIT_PARAMS` env variable, rename it to `HUSKY_GIT_PARAMS`.

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

Starting with `1.0.0`, husky can be configured using `.huskyrc`, `.huskyrc.json`, `.huskyrc.yaml`, `.huskyrc.yml`, `.huskyrc.js` or `husky.config.js` file.

```js
// .huskyrc
{
  "hooks": {
    "pre-commit": "npm test"
  }
}
```

### Supported hooks

Husky supports all Git hooks defined [here](https://git-scm.com/docs/githooks). Server-side hooks (`pre-receive`, `update` and `post-receive`) aren't supported.

### Access Git params and stdin

Git hooks can get parameters via command-line arguments and stdin. Husky makes them accessible via `HUSKY_GIT_PARAMS` and `HUSKY_GIT_STDIN` environment variables.

```
"commit-msg": "echo $HUSKY_GIT_PARAMS"
```

### Skip all hooks (rebase)

During a rebase you may want to skip all hooks, you can use `HUSKY_SKIP_HOOKS` environment variable.

```sh
HUSKY_SKIP_HOOKS=1 git rebase ...
```

### Disable auto-install

If you don't want husky to automatically install Git hooks, simply set `HUSKY_SKIP_INSTALL` environment variable.

```sh
HUSKY_SKIP_INSTALL=1 npm install
```

### CI servers

By default, Husky won't install on CI servers.

### Monorepos

If you have a multi-package repository, it's __recommended__ to use tools like [lerna](https://github.com/lerna/lerna) and have husky installed ONLY in the root `package.json` to act as the source of truth.

Generally speaking, you should AVOID defining husky in multiple `package.json`, as each package would overwrite previous husky installation.

```sh
.
└── root
    ├── .git
    ├── package.json 🐶 # Add husky here
    └── packages
        ├── A
        │   └── package.json
        ├── B
        │   └── package.json
        └── C
            └── package.json
```

```js
// root/package.json
{
  "private": true,
  "devDependencies": {
    "husky": "..."
  },
  "husky": {
    "hooks": {
      "pre-commit": "lerna run test"
    }
  }
}
```

### Node version managers

If you're on Windows, husky will simply use the version installed globally on your system.

For macOS and Linux users:
- if you're running `git` commands in the terminal, husky will use the version defined in your shell `PATH`. In other words, if you're a `nvm` user, husky will use the version that you've set with `nvm`.
- if you're using a GUI client and `nvm`, it may have a different `PATH` and not load `nvm`, in this case the highest `node` version installed by `nvm` will usually be picked. You can also check `~/.node_path` to see which version is used by GUIs and edit if you want to use something else.

### Local commands (~/.huskyrc)

Husky will source `~/.huskyrc` file if it exists before running hook scripts.
You can use it, for example, to load a node version manager or run some `shell` commands before hooks.

```sh
# ~/.huskyrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Multiple commands

By design and just like `scripts` defined in `package.json`, husky will run hook scripts as a single command. 

```json
"pre-commit": "cmd && cmd"
```

That said, if you prefer to use an array, the recommended approach is to define them in `.huskyrc.js` or `husky.config.js`.

```js
const tasks = arr => arr.join(' && ')

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      'cmd',
      'cmd'
    ])
  }
}
```

Tools like [npm-run-all](https://github.com/mysticatea/npm-run-all) can help too.

### Troubleshoot

#### Debug messages

`HUSKY_DEBUG=1` can provide additional information when running commands.

```
HUSKY_DEBUG=1 npm install husky --save-dev
HUSKY_DEBUG=1 git commit ...
```

#### Hooks aren't running

Check if hooks were installed. Verify that `.git/hooks/pre-commit` exists and have husky code. It should start with:

```sh
#!/bin/sh
# husky...
```

If not, you may have another Git hooks manager defined in your `package.json` overwriting husky's hooks. Check also the output during install, you should see:

```
husky > Setting up git hooks
husky > Done
```

#### Commits aren't blocked

For a commit to be blocked, `pre-commit` script must exit with a non-zero exit code. If you commit isn't blocked, check your script exit code.

#### Commits are slow

Husky is fast and only adds a few tenth of seconds to commits (`~0.3s` on a low-end PC). So it's most probably related to how many things are done during `pre-commit`. You can often improve this by using cache on your tools (babel, eslint, ...) and using [lint-staged](https://github.com/okonet/lint-staged).

#### Testing husky in a new repo

To isolate your issue, you can also create a new repo:

```sh
mkdir foo && cd foo
git init && npm init -y
npm install husky --save-dev

# Add a failing pre-commit hook to your package.json:
# "pre-commit": "echo \"this should fail\" && exit 1"

# Make a commit
```

#### ENOENT error 'node_modules/husky/.git/hooks'

Verify that your version of Git is `>=2.13.0`.

## See also

* [pkg-ok](https://github.com/typicode/pkg-ok) - Prevents publishing a module with bad paths or incorrect line endings
* [please-upgrade-node](https://github.com/typicode/please-upgrade-node) - Show a message to upgrade Node instead of a stacktrace in your CLIs
* [pinst](https://github.com/typicode/pinst) - dev only postinstall hook

## Patreon

People and companies supporting via Patreon: [thanks](https://thanks.typicode.com)

## License

MIT
