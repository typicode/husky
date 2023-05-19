# Troubleshooting

## Command not found

If you're running Git from an app and the command can be found in your terminal, this means that the `PATH` in your app is different from your terminal.

You can `echo $PATH` in your terminal and configure your app to use the same value.

If you've installed your command using `brew`, see the [Homebrew FAQ](https://docs.brew.sh/FAQ) to make your command available to your app.

Finally, if you're using a script for managing versions like `nvm`, `n`, `rbenv`, `pyenv`, ... you can use `~/.huskyrc` to load the necessary before running hooks.

For example, for `nvm` that would be:

::: code-group

```shell [~/.huskyrc]
# This loads nvm.sh, sets the correct PATH before running hook, and ensures the project version of Node
export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# If you have an .nvmrc file, we use the relevant node version
if [[ -f ".nvmrc" ]]; then
  nvm use
fi
```

:::

::: info
For some apps (e.g., VS Code), you can resolve this simply by restarting the app. Try this before following any of these steps above!\*\*
:::

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

## Does it work on Windows?

Yes. When you install Git on Windows, it comes with the necessary software to run shell scripts.
