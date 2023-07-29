# 从 v4 迁移

## CLI

请参见 [husky-4-to-8](https://github.com/typicode/husky-4-to-8) CLI 以快速从 v4迁移到 v8。

## 手动迁移

如果使用 `npm` 或 `yarn` 调用 `package.json` 脚本，只需将配置文件中的命令 **复制** 到相应的钩子即可：

::: code-group

```js [.huskyrc.json (v4)]
{
  "hooks": {
    "pre-commit": "npm test && npm run foo"
  }
}
```

```shell [.husky/commit-msg (v8)]
# ...
npm test
npm run foo
```

:::

如果您正在调用本地安装的二进制文件，**现在您需要通过您的包管理器运行它们**：

::: code-group

```js [.huskyrc.json (v4)]
{
  "hooks": {
    "pre-commit": "jest"
  }
}
```

```shell [.husky/commit-msg (v8)]
# ...
npx --no jest
# or
yarn jest
```

:::

`HUSKY_GIT_PARAMS` 环境变量现在替换为原生参数 `$1`、`$2`。

::: code-group

```js [.huskyrc.json (v4)]
{
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

```shell [.husky/commit-msg (v8)]
# ...
npx --no -- commitlint --edit $1
# or
yarn commitlint --edit $1
```

:::

其他环境变量改动：

- `HUSKY_SKIP_HOOKS` 替换为 `HUSKY`。
- `HUSKY_SKIP_INSTALL` 替换为 `HUSKY`。
- `HUSKY_GIT_PARAMS` 已被移除。取而代之的是，Git 参数应该直接在脚本中使用（例如 `$1`）。
- 本地安装工具的 `PATH` 不再自动设置。你需要使用包管理器来运行它们。
