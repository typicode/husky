[![Financial Contributors on Open Collective](https://opencollective.com/husky/all/badge.svg?label=financial+contributors)](https://opencollective.com/husky) [![](https://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![Mac/Linux Build Status](https://img.shields.io/travis/typicode/husky/master.svg?label=Mac%20OSX%20%26%20Linux)](https://travis-ci.org/typicode/husky) [![Windows Build status](https://img.shields.io/appveyor/ci/typicode/husky/master.svg?label=Windows)](https://ci.appveyor.com/project/typicode/husky)

> Git hooks made easy

Husky improves your commits and more 🐶*woof!*

You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports [all](https://git-scm.com/docs/githooks) Git hooks.

?> You're viewing documentation for husky v5, which is free to use in Open Source projects ❤️ and in early access for Sponsors 🎁. To use this new version at work, you can become a sponsor on [GitHub Sponsors](https://github.com/sponsors/typicode) or [Open Collective](https://opencollective.com/husky).<br><br>If you can't sponsor Husky, that's okay, [husky v4](https://github.com/typicode/husky/tree/master) is free to use in any project.

# Features

- Zero dependencies
- Lightweight
- Fast
- Supports macOS, Linux and Windows

# Usage

## Install

1. Install `husky` and [pinst](https://github.com/typicode/pinst) (optional)

```shell
# npm
npm install husky@next --save-dev
npm install pinst --save-dev # if your package is not private

# yarn
yarn add husky@next --dev
yarn add pinst --dev # if your package is not private
```

2. Enable Git hooks

```shell
npx husky install
yarn husky install
```

3. To automatically have Git hooks enabled after install, edit `package.json`

```js
// package.json
{
  "private": true,
  "scripts": {
    "postinstall": "husky install"
  }
}
```

!> **if your package is not private and you're publishing it on a registry like [npmjs.com](https://npmjs.com), you need to disable `postinstall` script using [pinst](https://github.com/typicode/pinst)**. Otherwise, `postinstall` will run when someone installs your package and result in an error.

```js
// package.json
{
  "private": false,
  "scripts": {
    "postinstall": "husky install",
    "prepublish": "pinst --disable",
    "postpublish": "pinst --enable"
  }
}
```

## Add a hook

To add a hook, you can use `husky add <hookname> [cmd]` (don't forget to run `husky install` before).

```shell
npx husky add pre-commit "npm test" # will create .husky/pre-commit file
```

Try to make a commit

```shell
git commit -m "Keep calm and commit"
```

If `npm test` command fails, your commit will be automatically aborted.

# Recipes

## Monorepo

It's recommended to add husky in root `package.json`. You can use tools like [lerna](https://github.com/lerna/lerna) and filters to only run scripts in packages that have been changed.

## Custom directory

If you want to install husky in another directory, for example `.config`, you can pass it to `install` command. For example:

```js
// package.json
{
  "scripts": {
    "postinstall": "husky install .config"
  }
}
```

Another case you may be in is if your `package.json` file and `.git` directory are not at the same level. For example, `project/.git` and `project/front/.package.json`.

By design, `husky install` must be run in the same directory as `.git`, but you can change directory during `postinstall` script and pass a subdirectory:

```js
// package.json
{
  "scripts": {
    "postinstall": "cd .. && husky install ./front"
  }
}
```

In your hooks, you'll also need to change directory:

```sh
# .husky/pre-commit
# ...
cd ./front
npm test
```

## Bypass hooks

You can bypass `pre-commit` and `commit-msg` hooks using Git `-n/--no-verify` option:

```shell
git commit -m "yolo!" --no-verify
```

For Git commands that don't have a `--no-verify` option, you can use `HUSKY` environment variable:

```shell
HUSKY=0 git push # yolo!
```

## Disable hooks in CI

You can set `HUSKY` environment variable to `0` in your CI config file, to disable all hooks.

Alternatively, most Continuous Integration Servers set a `CI` environment variable. You can use it in your hooks to detect if it's running in a CI.

```shell
# .husky/pre-commit
# ...
[ -z "$CI" ] && exit 0
```

You can also use [is-ci](https://github.com/watson/is-ci) in your `postinstall` script to conditionnally install husky

```shell
npm install is-ci --save-dev
```

```js
// package.json
{
  "scripts": {
    "postinstall": "is-ci || husky install"
  }
}
```

## Test hooks

If you want to test a hook, you can add `exit 1` at the end of the script to abort git command.

```shell
# .husky/pre-commit
# ...
exit 1 # Commit will be aborted
```

# FAQ

## Does it work on Windows?

Yes. When you install Git on Windows, it comes with the necessary software to run shell scripts.

# Troubleshoot

## Command not found

If you're running Git from an app and the command can be found in your terminal, this means that the `PATH` in your app is different from your terminal.

You can `echo $PATH` in your terminal and configure your app to use the same value.

If you've installed your command using `brew`, see the [Homebrew FAQ](https://docs.brew.sh/FAQ) to make your command available to your app.

Finally, if you're using a script for managing versions like `nvm`, `n`, `rbenv`, `pyenv`, ... you can use `~/.huskyrc` to load the necessary before running hooks.

For example, for `nvm` that would be:

```shell
# ~/.huskyrc
# this loads nvm.sh and sets the correct PATH before running hook
. ~/.nvm/nvm.sh
```

## Hooks not running

Ensure that you don't have a typo in your filename. For example, `precommit` or `pre-commit.sh` are invalid names. See Git hooks [documentation](https://git-scm.com/docs/githooks) for valid names.

Check hooks permissions, they should be executable. This is automatically set when using `husky add` command but you can run `chmod +x .husky/<hookname>` to fix that.

# Free for Open Source, early access for Sponsors

How it works?

- If you have an Open Source project, you're free to install or upgrade husky to v5 ❤️
- If you have a commercial project and are a Sponsor, you can start using v5 today at work 🎁

To acquire a proprietary-use license, simply go to [GitHub Sponsors](https://github.com/sponsors/typicode) or [Open Collective](https://opencollective.com/husky).

# Breaking changes

Environment variables:

- `HUSKY_SKIP_HOOKS` becomes `HUSKY`.
- `HUSKY_SKIP_INSTALL` is removed.
- `HUSKY_GIT_PARAMS` is removed. Instead Git parameters should be used directly in scripts (e.g. `$1`).
- `PATH` for locally installed tools is not automatically set anymore. You'll need to use your package manager to run them.

# Migrate from v4 to v5

## Package scripts (i.e. npm test, ...)

If you were calling `package.json` scripts, you don't have to make particular changes.

`v4`

```js
// .huskyrc.json
{
  "hooks": {
    "pre-commit": "npm test && npm run foo"
  }
}
```

`v5`

```shell
# .husky/pre-commit
# ...
npm test
npm run foo
```

## Locally installed tools (i.e. jest, eslint, ...)

`v4`

```js
// .huskyrc.json
{
  "hooks": {
    "pre-commit": "jest"
  }
}
```

`v5`

```shell
# .husky/pre-commit
# ...
npx --no-install jest
# or
yarn jest
```

## HUSKY_GIT_PARAMS (i.e. commitlint, ...)

`v4`

```js
// .huskyrc.json
{
  "hooks": {
    "pre-commit": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

`v5`

```shell
# .husky/pre-commit
# ...
npx --no-install commitlint --edit $1
# or
yarn commitlint --edit $1
```

# Sponsors

## Companies

<!-- for (let i = 0; i < 40; i++) console.log(`[![Husky Sponsor](https://opencollective.com/husky/backer/${i}/avatar)](https://opencollective.com/husky/backer/${i}/website)`) -->

Does your company use Husky? Ask your manager or marketing team if your company would be interested in supporting this project.

<a href="https://opencollective.com/husky/tiers/sponsor/0/website"><img src="https://opencollective.com/husky/tiers/sponsor/0/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/1/website"><img src="https://opencollective.com/husky/tiers/sponsor/1/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/2/website"><img src="https://opencollective.com/husky/tiers/sponsor/2/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/3/website"><img src="https://opencollective.com/husky/tiers/sponsor/3/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/4/website"><img src="https://opencollective.com/husky/tiers/sponsor/4/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/5/website"><img src="https://opencollective.com/husky/tiers/sponsor/5/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/6/website"><img src="https://opencollective.com/husky/tiers/sponsor/6/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/7/website"><img src="https://opencollective.com/husky/tiers/sponsor/7/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/8/website"><img src="https://opencollective.com/husky/tiers/sponsor/8/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/9/website"><img src="https://opencollective.com/husky/tiers/sponsor/9/avatar.svg" height="60px"></a>

## Individuals

Find Husky helpful? Become a backer and show your appreciation with a monthly donation on [Open Collective](https://opencollective.com/husky). You can also tip with a one-time donation.

[![Husky Sponsor](https://opencollective.com/husky/backer/0/avatar)](https://opencollective.com/husky/backer/0/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/1/avatar)](https://opencollective.com/husky/backer/1/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/2/avatar)](https://opencollective.com/husky/backer/2/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/3/avatar)](https://opencollective.com/husky/backer/3/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/4/avatar)](https://opencollective.com/husky/backer/4/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/5/avatar)](https://opencollective.com/husky/backer/5/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/6/avatar)](https://opencollective.com/husky/backer/6/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/7/avatar)](https://opencollective.com/husky/backer/7/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/8/avatar)](https://opencollective.com/husky/backer/8/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/9/avatar)](https://opencollective.com/husky/backer/9/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/10/avatar)](https://opencollective.com/husky/backer/10/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/11/avatar)](https://opencollective.com/husky/backer/11/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/12/avatar)](https://opencollective.com/husky/backer/12/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/13/avatar)](https://opencollective.com/husky/backer/13/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/14/avatar)](https://opencollective.com/husky/backer/14/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/15/avatar)](https://opencollective.com/husky/backer/15/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/16/avatar)](https://opencollective.com/husky/backer/16/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/17/avatar)](https://opencollective.com/husky/backer/17/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/18/avatar)](https://opencollective.com/husky/backer/18/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/19/avatar)](https://opencollective.com/husky/backer/19/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/20/avatar)](https://opencollective.com/husky/backer/20/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/21/avatar)](https://opencollective.com/husky/backer/21/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/22/avatar)](https://opencollective.com/husky/backer/22/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/23/avatar)](https://opencollective.com/husky/backer/23/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/24/avatar)](https://opencollective.com/husky/backer/24/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/25/avatar)](https://opencollective.com/husky/backer/25/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/26/avatar)](https://opencollective.com/husky/backer/26/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/27/avatar)](https://opencollective.com/husky/backer/27/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/28/avatar)](https://opencollective.com/husky/backer/28/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/29/avatar)](https://opencollective.com/husky/backer/29/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/30/avatar)](https://opencollective.com/husky/backer/30/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/31/avatar)](https://opencollective.com/husky/backer/31/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/32/avatar)](https://opencollective.com/husky/backer/32/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/33/avatar)](https://opencollective.com/husky/backer/33/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/34/avatar)](https://opencollective.com/husky/backer/34/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/35/avatar)](https://opencollective.com/husky/backer/35/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/36/avatar)](https://opencollective.com/husky/backer/36/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/37/avatar)](https://opencollective.com/husky/backer/37/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/38/avatar)](https://opencollective.com/husky/backer/38/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/39/avatar)](https://opencollective.com/husky/backer/39/website)

GitHub sponsors can be viewed on my [profile](https://github.com/typicode). All past and current Open Collective sponsors can be viewed on [Husky's Open Collective](https://opencollective.com/husky).

# License

[License Zero Parity 7.0.0](https://paritylicense.com/versions/7.0.0.html) and MIT (contributions) with exception [License Zero Patron 1.0.0](https://patronlicense.com/versions/1.0.0).
[License Zero Parity 7.0.0](https://paritylicense.com/versions/7.0.0.html) and MIT (contributions) with exception [License Zero Patron 1.0.0](https://patronlicense.com/versions/1.0.0).
