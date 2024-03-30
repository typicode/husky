# 快速开始

## 安装

::: code-group

```shell [npm]
npm install --save-dev husky
```

```shell [pnpm]
pnpm add --save-dev husky
```

```shell [yarn]
yarn add --dev husky
# 如果你的项目不是私有的，那么只需要安装 pinst
yarn add --dev pinst
```

```shell [bun]
bun add --dev husky
```

:::

## `husky init` <Badge type="tip" text="推荐" />

`init` 命令简化了项目中的 husky 设置。它会在 `.husky/` 中创建 `pre-commit` 脚本，并更新 `package.json` 中的 `prepare` 脚本。随后可根据你的工作流进行修改。

::: code-group

```shell [npm]
npx husky init
```

```shell [pnpm]
pnpm exec husky init
```

```shell [yarn]
# 由于特殊的注意事项和与其他包管理器的差异，
# 请参考“如何使用”章节。
```

```shell [bun]
bunx husky init
```

:::


## 试一试

恭喜你！你已经成功地用一个命令设置了你的第一个 Git 钩子 🎉。让我们测试一下：

```shell
git commit -m "Keep calm and commit"
# 测试脚本会在每次提交时运行
```

_有关手动设置和更多信息，请参见 [如何使用](how-to.md) 章节_

