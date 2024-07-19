# Troubleshoot

## Command not found

See [How To](how-to) for solutions.

## Hooks not running

1. Verify the file name is correct. For example, `precommit` or `pre-commit.sh` are invalid names. Refer to the Git hooks [documentation](https://git-scm.com/docs/githooks) for valid names.
2. Run `git config core.hooksPath` and ensure it points to `.husky/_` (or your custom hooks directory).
1. Confirm your Git version is above `2.9`.

## `.git/hooks/` Not Working After Uninstall

If hooks in `.git/hooks/` don't work post-uninstalling `husky`, execute `git config --unset core.hooksPath`.

## Yarn on Windows

Git hooks might fail with Yarn on Windows using Git Bash (`stdin is not a tty`). For Windows users, implement this workaround:

1. Create `.husky/common.sh`:

```shell
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash, and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

2. Source it where Yarn commands are run:

```shell
# .husky/pre-commit
. .husky/common.sh

yarn ...
```
