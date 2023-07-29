# 疑难解答

## 找不到命令

如果您在应用程序中运行 Git，而命令可以在终端中找到，这意味着应用程序中的 `PATH` 与终端中的不同。

你可以在终端中使用 `echo $PATH` 命令，然后配置你的应用为相同的值。

如果你使用 `brew` 安装了你的命令，请参阅 [Homebrew FAQ](https://docs.brew.sh/FAQ)，让你的应用程序可以使用你的命令。

最后，如果你正在使用管理版本的脚本，例如 `nvm`、`n`、`rbenv`、`pyenv`......你可以在运行 hooks 之前使用 `~/.huskyrc` 加载必要的脚本。
Finally, if you're using a script for managing versions like `nvm`, `n`, `rbenv`, `pyenv`, ... you can use `~/.huskyrc` to load the necessary before running hooks.

例如，对于 nvm，可以使用:

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

::: info 注意
对于某些应用程序（如 VS Code），只需重启应用程序即可解决此问题。在采取上述任何步骤之前，请先尝试一下！\*\*
:::

## Hooks 未运行

1. 确保文件名中没有错别字。例如 `precommit` 或 `pre-commit.sh` 都是无效名称。有关有效名称，请参阅 Git hooks [文档](https://git-scm.com/docs/githooks)。
2. 检查 `git config core.hooksPath` 是否返回 `.husky`（或你的自定义 hook 目录）。
3. 确认钩子文件是可执行的。使用 `husky add` 命令时会自动设置为可执行，但可以运行 `chmod +x .husky/<hookname>` 来修复。
4. 检查 Git 版本是否大于 `2.9`。

## 卸载后 .git/hooks/ 无法运行

如果卸载 `husky` 后，`.git/hooks/` 中的 hooks 不起作用。运行 `git config --unset core.hooksPath`。

注意：如果 `npm <7` 在卸载 husky 时会自动执行此操作，但现在已不支持 `preuninstall`。

## 在 Windows 上使用 Yarn

在 Windows 上使用 Yarn 和 Git Bash（`stdin 不是 tty`）时，Git hooks 可能会失败。如果用户使用的是 Windows 系统，强烈建议添加以下解决方案。

1. 创建 `.husky/common.sh`:

```shell
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

2. 在使用 Yarn 运行命令的地方输入源代码：

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
. "$(dirname -- "$0")/common.sh"

yarn ...
```

## 它能在 Windows 上运行吗？

可以。在 Windows 上安装 Git 时，会附带运行 shell 脚本所需的软件。
