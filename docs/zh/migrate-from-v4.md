# 从 v4 迁移

如果你使用 `npm` 或 `yarn` 调用 `package.json` 脚本，**你可以简单地将命令**从配置文件复制到相应的钩子：

Husky v4

```json
// package.json
{
  "hooks": {
    "pre-commit": "npm test && npm run foo" // [!code hl]
  }
}
```

Husky v9

```shell 
# .husky/pre-commit
# 提示，你现在可以在多行中输入命令
npm test # [!code hl]
npm run foo # [!code hl]
```

如果你想调用本地安装的二进制文件，**现在你需要通过包管理器运行它们**：

::: code-group

```js [.huskyrc.json (v4)]
{
  "hooks": {
    "pre-commit": "jest"
  }
}
```

```shell [.husky/pre-commit (v9)]
# ...
npx --no jest
# 或者
yarn jest
```

:::

`HUSKY_GIT_PARAMS` 环境变量现在替换成原生参数 `$1`、`$2`。

::: code-group

```js [.huskyrc.json (v4)]
{
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

```shell [.husky/commit-msg (v9)]
# ...
npx --no -- commitlint --edit $1
# 或者
yarn commitlint --edit $1
```

:::

其他环境变量的变化：

- `HUSKY_SKIP_HOOKS` 替换成 `HUSKY`.
- `HUSKY_SKIP_INSTALL` 替换成 `HUSKY`.
- `HUSKY_GIT_PARAMS` 被移除。取而代之的是 Git 参数应该直接在脚本中使用（例如 `$1`）。
- 本地安装工具的 `PATH` 不再自动设置，你需要使用包管理器来运行它们。
