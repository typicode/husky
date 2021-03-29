[![Financial Contributors on Open Collective](https://opencollective.com/husky/all/badge.svg?label=financial+contributors)](https://opencollective.com/husky) [![](https://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![Node.js CI](https://github.com/typicode/husky/workflows/Node.js%20CI/badge.svg)](https://github.com/typicode/husky/actions)

> Modern native git hooks made easy

Husky improves your commits and more 🐶 _woof!_

You can use it to **lint your commit messages**, **run tests**, **lint code**, etc... when you commit or push. Husky supports [all](https://git-scm.com/docs/githooks) Git hooks.

# Features

- Zero dependencies and lightweight (`6 kB`)
- Powered by modern new Git feature (`core.hooksPath`)
- Follows [npm](https://docs.npmjs.com/cli/v7/using-npm/scripts#best-practices) and [Yarn](https://yarnpkg.com/advanced/lifecycle-scripts#a-note-about-postinstall) best practices regarding autoinstall
- User-friendly messages
- Optional install
- __Like husky 4, supports__
  - macOS, Linux and Windows
  - Git GUIs
  - Custom directories
  - Monorepos

# Used by

The new husky is used by these awesome projects:

- [webpack/webpack](https://github.com/webpack/webpack)
- [angular/angular](https://github.com/angular/angular)
- [angular/angular-cli](https://github.com/angular/angular-cli)
- [angular/components](https://github.com/angular/components)
- [vercel/hyper](https://github.com/vercel/hyper)
- [blitz-js/blitz](https://github.com/blitz-js/blitz)
- [facebook/docusaurus](https://github.com/facebook/docusaurus)
- [typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- [11ty/eleventy](https://github.com/11ty/eleventy)
- [stylelint/stylelint](https://github.com/stylelint/stylelint)
- [rollup/rollup](https://github.com/rollup/rollup)
- [tauri-apps/tauri](https://github.com/tauri-apps/tauri)
- [NativeScript/NativeScript](https://github.com/NativeScript/NativeScript)
- [formatjs/formatjs](https://github.com/formatjs/formatjs)
- [react-bootstrap/react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)
- [react-dnd/react-dnd](https://github.com/react-dnd/react-dnd)
- [react-grid-layout/react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
- [snabbdom/snabbdom](https://github.com/snabbdom/snabbdom)
- [logaretm/vee-validate](https://github.com/logaretm/vee-validate)
- [zenorocha/clipboard.js](https://github.com/zenorocha/clipboard.js)
- [NodeBB/NodeBB](https://github.com/NodeBB/NodeBB)
- And [__more__](https://github.com/typicode/husky/network/dependents?package_id=UGFja2FnZS0xODQzNTgwNg%3D%3D)

# Usage

Already using husky? See [Migrate from 4 to 6](/?id=migrate-from-v4-to-v6).

## Automatic (recommended)

```shell
npx @husky/init && npm install       # npm
npx @husky/init && yarn              # Yarn 1
yarn dlx @husky/init --yarn2 && yarn # Yarn 2
```

The command above will setup husky, modify `package.json` and create a sample `pre-commit` hook that you can edit. By default, it will run `npm test` when you commit.

To add another hook use `husky add`.

For example:

```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

## Manual

### Install

1. Install `husky`

```shell
npm install husky --save-dev
```

2. Enable Git hooks

```shell
npx husky install
```

3. To automatically have Git hooks enabled after install, edit `package.json`

```shell
npm set-script prepare "husky install"
```

You should have:

```js
// package.json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

!> **Yarn 2 doesn't support `prepare` lifecycle script, so husky needs to be installed differently (this doesn't apply to Yarn 1 though). See [Yarn 2 install](/?id=yarn-v2).**

### Create a hook

To add a command to a hook or create a new one, use `husky add <file> [cmd]` (don't forget to run `husky install` before).

```shell
npx husky add .husky/pre-commit "npm test"
```

Try to make a commit

```shell
git commit -m "Keep calm and commit"
```

If `npm test` command fails, your commit will be automatically aborted.

!> **Using Yarn to run commands? There's an issue on Windows with Git Bash, see [Yarn on Windows](/?id=yarn-on-windows).**

### Uninstall

```shell
npm uninstall husky
```

## Yarn 2

### Install

1. Install `husky`

```shell
yarn add husky --dev
yarn add pinst --dev # ONLY if your package is not private
```

2. Enable Git hooks

```shell
yarn husky install
```

3. To automatically have Git hooks enabled after install, edit `package.json`

```js
// package.json
{
  "private": true, // ← your package is private, you only need postinstall
  "scripts": {
    "postinstall": "husky install"
  }
}
```

!> **if your package is not private and you're publishing it on a registry like [npmjs.com](https://npmjs.com), you need to disable `postinstall` script using [pinst](https://github.com/typicode/pinst)**. Otherwise, `postinstall` will run when someone installs your package and result in an error.

```js
// package.json
{
  "private": false, // ← your package is public
  "scripts": {
    "postinstall": "husky install",
    "prepublishOnly": "pinst --disable",
    "postpublish": "pinst --enable"
  }
}
```

### Uninstall

Remove `"postinstall": "husky install"` from `package.json` and run:

```shell
yarn remove husky && git config --unset core.hooksPath
```

# Recipes

## Monorepo

It's recommended to add husky in root `package.json`. You can use tools like [lerna](https://github.com/lerna/lerna) and filters to only run scripts in packages that have been changed.

## Custom directory

If you want to install husky in another directory, for example `.config`, you can pass it to `install` command. For example:

```js
// package.json
{
  "scripts": {
    "prepare": "husky install .config/husky"
  }
}
```

Another case you may be in is if your `package.json` file and `.git` directory are not at the same level. For example, `project/.git` and `project/front/package.json`.

By design, `husky install` must be run in the same directory as `.git`, but you can change directory during `prepare` script and pass a subdirectory:

```js
// package.json
{
  "scripts": {
    "prepare": "cd .. && husky install front/.husky"
  }
}
```

In your hooks, you'll also need to change directory:

```shell
# .husky/pre-commit
# ...
cd front
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
[ -n "$CI" ] && exit 0
```

You can also use [is-ci](https://github.com/watson/is-ci) in your `prepare` script to conditionnally install husky

```shell
npm install is-ci --save-dev
```

```js
// package.json
{
  "scripts": {
    "prepare": "is-ci || husky install"
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

## Git-flow

If using [git-flow](https://github.com/petervanderdoes/gitflow-avh/) you need to ensure your git-flow hooks directory is set to use Husky's (`.husky` by default).

```shell
git config gitflow.path.hooks .husky
```

**Note:**

- If you are configuring git-flow _after_ you have installed husky, the git-flow setup process will correctly suggest the .husky directory.
- If you have set a [custom directory](/?id=custom-directory) for husky you need to specify that (ex. `git config gitflow.path.hooks .config/husky`)

To **revert** the git-flow hooks directory back to its default you need to reset the config to point to the default Git hooks directory.

```shell
git config gitflow.path.hooks .git/hooks
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
# This loads nvm.sh and sets the correct PATH before running hook
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Hooks not running

Ensure that you don't have a typo in your filename. For example, `precommit` or `pre-commit.sh` are invalid names. See Git hooks [documentation](https://git-scm.com/docs/githooks) for valid names.

Verify hooks permissions, they should be executable. This is automatically set when using `husky add` command but you can run `chmod +x .husky/<hookname>` to fix that.

Check that your version of Git is greater than `2.9`.

## Yarn on Windows

Git hooks may fail when using Yarn on Windows with Git Bash (`stdin is not a tty`). If you have users on Windows, it's highly recommended to add the following workaround.

1. Create `.husky/common.sh`:

```shell
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

2. Source it in in places where Yarn is used to run commands:

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh"

yarn ...
```

# Breaking changes

Environment variables:

- `HUSKY_SKIP_HOOKS` becomes `HUSKY`.
- `HUSKY_SKIP_INSTALL` is removed.
- `HUSKY_GIT_PARAMS` is removed. Instead Git parameters should be used directly in scripts (e.g. `$1`).
- `PATH` for locally installed tools is not automatically set anymore. You'll need to use your package manager to run them.

# Migrate from v4 to v6

## husky-4-to-6 CLI

See [husky-4-to-6](https://github.com/typicode/husky-4-to-5) CLI to quickly migrate from v4 to v6.

## Package scripts

If you were calling `package.json` scripts using `npm` or `yarn`, **you can simply copy your commands**:

```js
// .huskyrc.json (v4)
{
  "hooks": {
    "pre-commit": "npm test && npm run foo"
  }
}
```

```shell
# .husky/pre-commit (v6)
# ...
npm test
npm run foo
```

## Locally installed binaries

If you were calling directly locally installed binaries, **you need to run them via your package manager**:

```js
// .huskyrc.json (v4)
{
  "hooks": {
    "pre-commit": "jest"
  }
}
```

```shell
# .husky/pre-commit (v6)
# ...
npx --no-install jest
yarn jest
```

## HUSKY_GIT_PARAMS (i.e. commitlint, ...)

Previous `HUSKY_GIT_PARAMS` environment variable is replaced by native params `$1`, `$2`, etc.

```js
// .huskyrc.json (v4)
{
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

```shell
# .husky/commit-msg (v6)
# ...
npx --no-install commitlint --edit $1
# or
yarn commitlint --edit $1
```

# Sponsors

## Companies

Does your company use husky? Ask your manager or marketing team if your company would be interested in supporting this project.

<a href="https://opencollective.com/husky/tiers/sponsor/0/website"><img src="https://opencollective.com/husky/tiers/sponsor/0/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/1/website"><img src="https://opencollective.com/husky/tiers/sponsor/1/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/2/website"><img src="https://opencollective.com/husky/tiers/sponsor/2/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/3/website"><img src="https://opencollective.com/husky/tiers/sponsor/3/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/4/website"><img src="https://opencollective.com/husky/tiers/sponsor/4/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/5/website"><img src="https://opencollective.com/husky/tiers/sponsor/5/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/6/website"><img src="https://opencollective.com/husky/tiers/sponsor/6/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/7/website"><img src="https://opencollective.com/husky/tiers/sponsor/7/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/8/website"><img src="https://opencollective.com/husky/tiers/sponsor/8/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/9/website"><img src="https://opencollective.com/husky/tiers/sponsor/9/avatar.svg" height="80px"></a>

## Individuals

Find husky helpful? Become a backer and show your appreciation with a monthly donation on [Open Collective](https://opencollective.com/husky). You can also tip with a one-time donation.

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
[![Husky Sponsor](https://opencollective.com/husky/backer/40/avatar)](https://opencollective.com/husky/backer/40/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/41/avatar)](https://opencollective.com/husky/backer/41/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/42/avatar)](https://opencollective.com/husky/backer/42/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/43/avatar)](https://opencollective.com/husky/backer/43/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/44/avatar)](https://opencollective.com/husky/backer/44/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/45/avatar)](https://opencollective.com/husky/backer/45/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/46/avatar)](https://opencollective.com/husky/backer/46/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/47/avatar)](https://opencollective.com/husky/backer/47/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/48/avatar)](https://opencollective.com/husky/backer/48/website)

GitHub sponsors can be viewed on my [profile](https://github.com/typicode). All past and current Open Collective sponsors can be viewed on [here](https://opencollective.com/husky).

# License

MIT
