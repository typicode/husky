# 故障排查

## 找不到命令（Command not found）

请参阅 [如何使用](./how-to) 获取解决方案。

## 钩子未运行

1. 验证文件名是否正确。例如，`precommit` 或 `pre-commit.sh` 都是无效的名称。有效名称请参考 Git 钩子[文档](https://git-scm.com/docs/githooks)。
2. 运行 `git config core.hooksPath` 并确保它指向 `.husky/_`（或者你的自定义目录）。
3. 确认你的 Git 版本高于 `2.9`。

## 卸载后 `.git/hooks/` 无法正常使用

如果卸载 `husky` 后 hooks 在 `.git/hooks/` 中无法正常使用，请执行命令 `git config --unset core.hooksPath`。

## 在 Windows 上使用 Yarn

在 Windows 上使用 Git Bash 时，Git 钩子可能会失败(`stdin is not a tty`)。对于 Windows 用户，通过以下解决方案来实现：

1. 创建 `.husky/common.sh`:

```shell
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Windows 10、Git Bash 和 Yarn 的解决方案
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

1. 在运行 Yarn 命令的地方使用它：

```shell
# .husky/pre-commit
. "$(dirname -- "$0")/common.sh"

yarn ...
```