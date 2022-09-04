[![Financial Contributors on Open Collective](https://opencollective.com/husky/all/badge.svg?label=financial+contributors)](https://opencollective.com/husky) [![](https://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![Node.js CI](https://github.com/typicode/husky/workflows/Node.js%20CI/badge.svg)](https://github.com/typicode/husky/actions)

> Modern native git hooks made easy

Husky improves your commits and more 🐶 _woof!_

You can use it to **lint your commit messages**, **run tests**, **lint code**, etc... when you commit or push. Husky supports [all Git hooks](https://git-scm.com/docs/githooks).

IMPORTANT: Only supports [Git 2.9](https://github.com/git/git/blob/master/Documentation/RelNotes/2.9.0.txt#L127-L128) and above.

# Migrate from 4 to 8

Already using husky?

Husky v4 was configured entirely using `package.json`, whereas v8 doesn't
*need* to modify `package.json` at all.

See [Migrate from 4 to 8](/?id=migrate-from-v4-to-v8).

# How it works

Husky is a set of simple wrapper tools that help easily configure a git
repository's hooks. Husky relies on git's internal tools to actually run the
hooks.

Husky can (optionally) integrate into a project's `npm`/`yarn` system,
supporting [lifecycle
scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts#prepare-and-prepublish)
allowing things like auto-installing and auto-configuring of your hooks, making
hook-management for teams much easier. (See 'Recipes' for more details).

Husky uses git's own native `core.hooksPath` [config setting
](https://git-scm.com/docs/githooks) to specify a path (`.husky` by
default) containing git-hooks. This path contains the hook
entry-points and each entry-point should be named to match one of the hooks
defined in the [git docs](https://git-scm.com/docs/githooks).

Effectively `husky install {.husky}` sets `core.hooksPath` to the path passed
in and then git uses that directory for hooks (instead of the older .git/hooks
path).

Because husky sets this git config in this way, you can edit your hooks and
commit them with your code meaning you do not have to manage them separately as
you do with other solutions - you *can* manage them separately, but you do not
have to. This makes husky more intuitive.

# Examples

These examples required that `core.hooksPath` is configured, see [install
steps](/?id=usage) for more details.

## `.husky/pre-commit`

This script will be run before every commit and can be used for code linting,
prettifiying, running checks and so on:

```shell
npx husky add .husky/pre-commit 'yarn run fasttest'
git add .husky/pre-commit
```

It's advisable to keep this very fast, to avoid your team skipping verification
because it blocks their workflows (move heavier checks to `pre-push` or CI/CD).

## `.husky/pre-push`

If you want to enforce that your team run tests locally before they push to
origin create a script `.husky/pre-push`:

```shell
npx husky add .husky/pre-push 'yarn run test'
git add .husky/pre-push
```

It's advisable to keep this fast, but not at the cost of either breaking
workflows for other team members, or wasted CI/CD resources.

## `.husky/commit-msg`

If you want to lint your commit messages (or auto format it) using something
like [commitlint](https://commitlint.js.org/):

```shell
npx husky add .husky/commit-msg 'npx --no commitlint --edit "$1"'
git add .husky/commit-msg
```

## `.husky/<git-hook>`

See [git's documentation](https://git-scm.com/docs/githooks) for other hooks
you can use.

# Features

- Zero npm dependencies and lightweight (`6 kB`)
- Powered by modern new Git feature (`core.hooksPath`, available since Git 2.9)
- Follows [npm](https://docs.npmjs.com/cli/v8/using-npm/scripts#best-practices) and [Yarn](https://yarnpkg.com/advanced/lifecycle-scripts#a-note-about-postinstall) best practices regarding autoinstall
- User-friendly messages
- Optional install
- __Like husky 4, supports__
  - macOS, Linux and Windows
  - Git GUIs
  - Custom directories
  - Monorepos

# Used by

Husky is used by these awesome projects:

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
- [ant-design/ant-design](https://github.com/ant-design/ant-design)
- And [__more__](https://github.com/typicode/husky/network/dependents?package_id=UGFja2FnZS0xODQzNTgwNg%3D%3D)

## Articles

- [Why husky has dropped conventional JS config](https://blog.typicode.com/husky-git-hooks-javascript-config/)
- [Why husky doesn't autoinstall anymore](https://blog.typicode.com/husky-git-hooks-autoinstall/)

# Usage

## Easy install (reccomended)

`husky-init` is a one-time command to configure a project with husky.

It installs husky into your project and auto-configures your package.json,
ensuring that every time you run `yarn|npm install` git is then configured to
use your hooks (so you don't have to worry about it again).

```shell
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2+
pnpm dlx husky-init && pnpm install # pnpm
```

It will:
* install husky
* modify `package.json` (adding a
[`prepare`](https://docs.npmjs.com/cli/v8/using-npm/scripts#prepare-and-prepublish)
script)
* create a sample `pre-commit` hook that you can edit. By default this runs
  `npm test` when you commit.

## Manual Install

1. Install `husky`

```shell
npm install husky --save-dev
```

2. Enable Git hooks

```sh
npx husky install # will configure git to use .husky/ by default
```

3. To automatically have Git hooks enabled after every npm/yarn install, edit
`package.json` to use one of the [npm/yarm lifecyle
hooks](https://docs.npmjs.com/cli/v8/using-npm/scripts#prepare-and-prepublish)
e.g. `prepare`.


```shell
npm pkg set scripts.prepare="husky install"
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

!> **Yarn 2+ doesn't support `prepare` lifecycle script, so husky needs to be installed differently (this doesn't apply to Yarn 1 though). See [Yarn 2+ install](/?id=yarn-2).**

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
    "prepack": "pinst --disable",
    "postpack": "pinst --enable"
  }
}
```

## Adding new hooks

To add a command to a hook or create a new one use `husky add
<.husky/hook-name> [cmd]`. Don't forget to ensure you've called `husky install
{.husky}` to configure core.hooksPath.

IMPORTANT! `hook-name` should be a valid name of git-hook.

Each of the files in `.husky` (or which ever path you chose) should be commited.

_For Windows users, if you see the help message when running `npx husky add ...`, try `node node_modules/husky/lib/bin add ...` instead. This isn't an issue with husky code._

```shell
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
git commit -m "Keep calm and commit"  # npm test should be called
```

If `npm test` command fails (return a non-zero exit code), your `git-commit`
command will be automatically aborted.

!> **Using Yarn to run commands? There's an issue on Windows with Git Bash, see [Yarn on Windows](/?id=yarn-on-windows).**

_For Windows users, if you see the help message when running `npx husky add ...`, try `node node_modules/.bin/husky add ...` instead. This isn't an issue with husky code and is fixed in recent versions of npm 8._

## Uninstall

```shell
npm uninstall husky && git config --unset core.hooksPath
```

### Yarn 2 Uninstall

Remove `"postinstall": "husky install"` from `package.json` and run:

```shell
yarn remove husky && git config --unset core.hooksPath
```

## Monorepo

It's recommended to add husky in root `package.json`. You can use tools like [lerna](https://github.com/lerna/lerna) and filters to only run scripts in packages that have been changed.

## Custom hooks directory

If you want to install husky in another directory than the default `.husky`,
for example `.config`, you can pass it to `install` command:

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

## Disable husky in CI/Docker/Prod

There's no right or wrong way to disable husky in CI/Docker/Prod context and is highly __dependent on your use-case__.

### With npm

If you want to prevent husky from installing completely

```shell
npm ci --omit=dev --ignore-scripts
```

Alternatively, you can specifically disable `prepare` script with

```shell
npm set-script prepare ""
npm ci --omit=dev
```

### With a custom script

You can create a custom JS script and conditionally require husky and install hooks.

```json
"prepare": "node ./prepare.js"
```

```js
// prepare.js
const isCi = process.env.CI !== undefined
if (!isCi) {
  require('husky').install()
}
```

You can also use your own logging functions if needed:

```js
// prepare.js
const { configure } = require('husky')
const husky = configure({
  log: (msg) => console.log(msg),
  error: (msg) => console.error(`Something went bad: ${msg}`)
})
husky.install()
```

Or make `prepare` script fail silently if husky is not installed:

```json
"prepare": "node -e \"try { require('husky').install() } catch (e) {if (e.code !== 'MODULE_NOT_FOUND') throw e}\""
```

### With env variables

You can set `HUSKY` environment variable to `0` in your CI config file, to disable hooks installation.

Alternatively, most Continuous Integration Servers set a `CI` environment variable. You can use it in your hooks to detect if it's running in a CI.

```shell
# .husky/pre-commit
# ...
[ -n "$CI" ] && exit 0
```

### With is-ci

You can also use [is-ci](https://github.com/watson/is-ci) in your `prepare` script to conditionally install husky

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

1. Ensure that you don't have a typo in your filename. For example, `precommit` or `pre-commit.sh` are invalid names. See Git hooks [documentation](https://git-scm.com/docs/githooks) for valid names.
1. Check that `git config core.hooksPath` returns `.husky` (or your custom hooks directory).
1. Verify that hook files are executable. This is automatically set when using `husky add` command but you can run `chmod +x .husky/<hookname>` to fix that.
1. Check that your version of Git is greater than `2.9`.

## .git/hooks/ not working after uninstall

If after uninstalling `husky`, hooks in `.git/hooks/` aren't working. Run `git config --unset core.hooksPath`.

Note: this was done automatically by `npm <7` when uninstalling husky, however `preuninstall` is now unsupported.

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
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
. "$(dirname -- "$0")/common.sh"

yarn ...
```

# Breaking changes

Environment variables:

- `HUSKY_SKIP_HOOKS` is replaced by `HUSKY`.
- `HUSKY_SKIP_INSTALL` is replaced by `HUSKY`.
- `HUSKY_GIT_PARAMS` is removed. Instead Git parameters should be used directly in scripts (e.g. `$1`).
- `PATH` for locally installed tools is not automatically set anymore. You'll need to use your package manager to run them.

# Migrate from v4 to v8

## husky-4-to-8 CLI

See [husky-4-to-8](https://github.com/typicode/husky-4-to-8) CLI to quickly migrate from v4 to v8.

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
# .husky/pre-commit (v8)
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
# .husky/pre-commit (v8)
# ...
npx --no jest
# or
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
# .husky/commit-msg (v8)
# ...
npx --no -- commitlint --edit $1
# or
yarn commitlint --edit $1
```

# Sponsors

## Companies

Does your company use husky? Ask your manager or marketing team if your company would be interested in supporting this project.

<a href="https://opencollective.com/husky/tiers/company/0/website"><img src="https://opencollective.com/husky/tiers/company/0/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/1/website"><img src="https://opencollective.com/husky/tiers/company/1/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/2/website"><img src="https://opencollective.com/husky/tiers/company/2/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/3/website"><img src="https://opencollective.com/husky/tiers/company/3/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/4/website"><img src="https://opencollective.com/husky/tiers/company/4/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/5/website"><img src="https://opencollective.com/husky/tiers/company/5/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/6/website"><img src="https://opencollective.com/husky/tiers/company/6/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/7/website"><img src="https://opencollective.com/husky/tiers/company/7/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/8/website"><img src="https://opencollective.com/husky/tiers/company/8/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/9/website"><img src="https://opencollective.com/husky/tiers/company/9/avatar.svg?avatarHeight=120"></a>

## Individuals

Find husky helpful? Become a backer and show your appreciation with a monthly donation on [Open Collective](https://opencollective.com/husky). You can also tip with a one-time donation.

<a href="https://opencollective.com/husky" target="_blank"><img src="https://opencollective.com/husky/tiers/individual.svg?avatarHeight=32"/></a>

GitHub sponsors can be viewed on my [profile](https://github.com/typicode). All past and current Open Collective sponsors can be viewed on [here](https://opencollective.com/husky).

# License

MIT
