# 开始使用

## 自动 <Badge type="tip" text="推荐" />

`husky-init` 是一个一次性命令，用于快速初始化一个带有 husky 的项目。

::: code-group

```shell [npm]
npx husky-init && npm install
```

```shell [pnpm]
pnpm dlx husky-init && pnpm install
```

```shell [yarn]
yarn dlx husky-init --yarn2 && yarn
```

:::

它将会:

1. 添加 `prepare` 脚本到 `package.json`
2. 创建一个你能够编辑的 `pre-commit` hook 示例（默认情况下，`npm test` 将在你提交时运行）
3. 配置 Git hooks 路径

要添加另一个 hook，请使用 `husky add`。例如：

```shell
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

::: info 注意
对于 Windows 用户，如果在运行 `npx husky add ...` 时看到帮助信息，请尝试使用 `node node_modules/husky/lib/bin add ...`。这不是 husky 代码的问题。
:::

## 手动

### 安装

1. 安装 `husky`

```shell
npm install husky --save-dev
```

2. 启用 Git hooks

```shell
npx husky install
```

3. 要在安装后自动启用 Git hooks，请编辑 `package.json`

```shell
npm pkg set scripts.prepare="husky install"
```

你应该这样做:

::: code-group

```json [package.json]
{
  "scripts": {
    "prepare": "husky install" // [!code hl]
  }
}
```

:::

::: info 注意
Yarn 2+ 不支持编写生命周期脚本，所以 husky 需要以不同的方式安装（但这不适用于 Yarn1）。参见 [Yarn 2+ 安装](#yarn-2)。
:::

## 创建一个 hook

要向 hook 添加命令或创建新的 hook，可以使用 `husky add <file> [cmd]`（再此之前不要忘记执行 `husky install`）。

```shell
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```

尝试提交

```shell
git commit -m "Keep calm and commit"
```

如果 `npm test` 命令执行失败，你的提交会被自动终止。

::: warning 警告
**想要使用 Yarn 运行命令？Git Bash 在 Windows 上有个问题，请参阅 [在 Windows 上使用 Yarn](./troubleshooting.md#在-windows-上使用-yarn)。**
:::

_对于 Windows 用户，如果在运行 `npx husky add ...` 时看到帮助信息，请尝试使用 `node node_modules/husky/lib/bin add ...`。这不是 husky 代码的问题，在 npm 8 的最新版本已经修复了。_

### 卸载

```shell
npm uninstall husky && git config --unset core.hooksPath
```

## Yarn 2

### 安装

1. 安装 `husky`

```shell
yarn add husky --dev
yarn add pinst --dev # ONLY if your package is not private
```

2. 启用 Git hooks

```shell
yarn husky install
```

3. 要在安装后自动启用 Git hooks，请编辑 `package.json`

::: code-group

```js [package.json]
{
  "private": true, // ← 你的 package 是私有的，你只需要 postinstall
  "scripts": {
    "postinstall": "husky install"
  }
}
```

:::

::: tip 提示
如果您的软件包不是私有的，并且您正在像 [npmjs.com](https://npmjs.com) 这样的仓库上发布它，那么您需要使用 [pinst](https://github.com/typicode/pinst)\*\* 禁用 postinstall 脚本。否则，当有人安装你的软件包并导致错误时，将运行 postinstall。
:::

::: code-group

```js [package.json]
{
  "private": false, // ← 你的 package 是共有的
  "scripts": {
    "postinstall": "husky install",
    "prepack": "pinst --disable",
    "postpack": "pinst --enable"
  }
}
```

:::

### 卸载

从 `package.json` 中移除 `"postinstall": "husky install"`，并执行：

```shell
yarn remove husky && git config --unset core.hooksPath
```
