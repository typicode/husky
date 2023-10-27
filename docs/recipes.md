# Recipes

## Startup files

Husky lets you run local commands before running hooks. There are four files that husky will read commands from:

- `$XDG_CONFIG_HOME/husky/init.sh`
- `~/.config/home/init.sh`
- `~/.huskyrc` (deprecated)
- `$ZDOTDIR/.zshenv` (only if `$SHELL=zsh`)

## Skipping Git Hooks

### For a single command

Most of the Git commands accept a `-n/--no-verify` option. If you need to skip hooks you can do so natively:

```sh
git commit -m "..." -n # Git hooks will be skipped
```

In the rare cases, where the command doesn't support this flag. You can use `HUSKY=0` to disable all hooks temporarily:

```shell
HUSKY=0 git ... # All Git hooks will be disabled during this command
git ... # Git hooks will run again
```

### For multiple commands

If you need to disable all hooks for a longer session (for example, during a rebase/merge), you can do so this way:

```shell
export HUSKY=0 # All Git hooks will be disabled until HUSKY env variable is unset
git ...
git ...
unset HUSKY
```

### For a GUI or globally

If you need to disable Git hooks in the context of a GUI Git client or globally, you can use husky config file:

```sh
# ~/.config/husky/init.sh
export HUSKY=0 # Husky won't install and won't run hooks on your machine
```

## CI server and Docker

On a CI server or in Docker, you may want to not install Git Hooks, following the previous examples, you can use `HUSKY=0`.

For example, for GitHub actions you can disable husky this way:

```yml
# https://docs.github.com/en/actions/learn-github-actions/variables
env:
  HUSKY: 0
```

However, this won't be sufficient if you're using a command that installs only `dependencies` (and not `devDependencies`)

For example, if `NODE_ENV=production` then `npm install` will not install `husky` since it's a devDependency. As a consequence, `"prepare": "husky"` script will fail because `husky` command won't be found.

You have two ways to circumvent this.

You can change your `prepare` script to not fail.

```json
// package.json
"prepare": "husky || true"
```

You'll still get the `command not found` error message in your output which may be confusing.

If you need more control on the output and want to make it silent, create a `.husky/install.js` file:

```js
// Do no try to install husky in production or in CI servers
if (process.env.NODE_ENV === 'production' || process.env.CI === '1') {
  process.exit(0)
}
const husky = await import('husky')
husky()
```

Then use it in your `prepare` script:

```json
"prepare": "node .husky/install.js"
```

## Running commands conditionnally

```sh

```

## Test hooks code without commiting

If you need to test a hook but don't want the git command to execute, you can add `exit 1` to abort Git command.

For example:

```shell
# .husky/pre-commit

# Your WIP script
# ...

exit 1
```

```shell
git commit -m "testing pre-commit code"
# A commit won't be created
```

## Project is not in Git root directory

For security reasons, husky won't install if you try to install it in the parent directories (`..`to install it in the parent directory (`..`). That being said, you can change directory during prepare script.

Let's imagine you have the following project structure:

```
.
├── .git/
├── backend/  # No package.json
└── frontend/ # Package.json with husky
```

```json
"prepare": "cd .. && husky frontend/.husky"
```

```shell
# frontend/.husky/pre-commit
# Hooks start at .git directory level, so we need to change directory back to frontend
cd frontend
npm test
```

## Node version managers and GUIs

If you're running Git hooks in GUIs and have installed Node using a version manager (`nvm`, `n`, `fnm`, ...), you may encounter a `command not found` error.

This is an issue with the `PATH` environment variable.

### The issue

If you're unfamiliar with how `PATH` and version managers, here's a quick overview.

`PATH` is a variable which holds a list of directories. When you run a command in your shell, your shell will look for your command in this list. If it doesn't find it, you'll get a `command not found` message.

You can run `echo $PATH` in a shell to view it's content.

Now, how does a version manager work and how does it relate to this environment variable?

When you install a version manager, two things happen:
1. You add an initialization code in your shell startup file (`.zshrc`, `.bashrc`, ...), which runs everytime when you open a terminal
2. You download a couple versions somewhere in your home directory

Let's suppose, your version manager have downloaded two versions of Node which can be found there:

```shell
~/version-manager/Node-X/node
~/version-manager/Node-Y/node
```

When you open a new terminal, the version manager initialization code will pick one of these versions (let's say `Y`), it will modify your `PATH` environment variable by prepending the path to this version:

```shell
echo $PATH
# You should see something like this
~/version-manager/Node-Y/:...
```

Now when you run `node` command, it will run `node` from the first directory where `node` is found. Which in this case, `node` from version `Y` directory.

If you switch to version `X` using your version managers, your `PATH` will be changed again:

```shell
echo $PATH
# Directory has been changed from Node-Y to Node-Y
~/version-manager/Node-X/:...
```

The important aspect to understand why your GUIs fails to find Node is that this `PATH` is not modified globally. It's local to your current shell/terminal.

In other words, if you open a GUI from outside the terminal (from the Dock for example), your version manager won't be initialized (because it's a script started by your shell) and your `PATH` won't contain the path to your Node install.

Therefore Git hooks started from your GUI will likely fail.

### A solution

Before each Git hook, husky sources `~/.config/husky/init.sh`. By copying your version manager initialization code to this file, you can have your version manager run in GUIs which would not support it by default.

For example, with `nvm`:

```shell
# ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

If you're shell startup file is lightweight, you can even source it directly to avoid duplication of code:

```shell
# ~/.config/husky/init.sh
. ~/.zshrc
```
