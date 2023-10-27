# Troubleshooting

## Command not found

See [recipes](recipes).

## Hooks not running

1. Ensure that you don't have a typo in your filename. For example, `precommit` or `pre-commit.sh` are invalid names. See Git hooks [documentation](https://git-scm.com/docs/githooks) for valid names.
1. Check that `git config core.hooksPath` returns `.husky/_` (or your custom hooks directory).
1. Check that your version of Git is greater than `2.9`.

## .git/hooks/ not working after uninstall

If after uninstalling `husky`, hooks in `.git/hooks/` aren't working. Run `git config --unset core.hooksPath`.

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
. "$(dirname -- "$0")/common.sh"

yarn ...
```