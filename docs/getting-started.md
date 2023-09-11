# Getting started

Install husky and configure Git hooks

::: code-group

```shell [npm]
npm install --save-dev husky
npx husky
```

```shell [pnpm]
pnpm add --save-dev husky
pnpm exec husky
```

```shell [yarn]
yarn add --dev husky
yarn exec husky
```

```shell [bun]
bunx husky-init && bun install
```

:::

To automatically have Git hooks enabled after install, edit `package.json`

::: code-group

```json [package.json]
{
  "scripts": {
    "prepare": "husky" // [!code hl]
  }
}
```

:::

Create a `pre-commit` hook

::: code-group

```shell [.husky/pre-commit]
npm test
```

:::

Make a commit

```shell
git commit -m "Keep calm and commit"
# `npm test` will run every time you commit
```

::: info
Yarn 2+ doesn't support `prepare` lifecycle script, so husky needs to be installed differently (this doesn't apply to Yarn 1 though). See [Yarn 2+ install](#yarn-2).
:::

::: warning
**Using Yarn to run commands? There's an issue on Windows with Git Bash, see [Yarn on Windows](#yarn-on-windows).**
:::

Uninstall

```shell
npm uninstall husky && git config --unset core.hooksPath
```

## Yarn 2

### Install

1. Install `husky`

```shell
yarn add husky --dev
yarn add pinst --dev # ONLY if your package is not private
```

2. Enable Git hooks

```shell
yarn husky
```

3. To automatically have Git hooks enabled after install, edit `package.json`

::: code-group

```js [package.json private=true]
{
  "private": true,
  "scripts": {
    "postinstall": "husky"
  }
}
```

```js [package.json private=false]
{
  "scripts": {
    "postinstall": "husky",
    "prepack": "pinst --disable",
    "postpack": "pinst --enable"
  }
}
```

:::

::: tip
if your package is not private and you're publishing it on a registry like [npmjs.com](https://npmjs.com), you need to disable `postinstall` script using [pinst](https://github.com/typicode/pinst)\*\*. Otherwise, `postinstall` will run when someone installs your package and result in an error.
:::

### Uninstall

Remove `"postinstall": "husky"` from `package.json` and run:

```shell
yarn remove husky && git config --unset core.hooksPath
```

## Automatic (recommended)

`husky-init` is a one-time command to quickly initialize a project with husky.

::: code-group

```shell [npm]
npx husky-init
```

```shell [pnpm]
pnpm dlx husky-init
```

```shell [yarn]
yarn dlx husky-init --yarn2
```

:::

`husky-init` will:

1. Add `prepare` script to `package.json`
1. Create a sample `pre-commit` hook that you can edit (by default, `npm test` will run when you commit)
1. Set Git `core.hooksPath` repository option

To add another hook, simply create a new file in `.husky/`. For example to add `commit-msg` hook:

:::code-group

```shell [.husky/commit-msg]
npx --no -- commitlint --edit "$1"
```

:::
