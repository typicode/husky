# Getting started

Install husky and configure Git hooks

## Setup

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
yarn add husky --dev
yarn add pinst --dev # ONLY if your package is not private
yarn run husky
```

```shell [bun]
bunx husky-init && bun install
```

:::

To automatically have Git hooks enabled after install, edit `package.json`

::: code-group

```json [npm]
{
  "scripts": {
    "prepare": "husky" // [!code hl]
  }
}
```

```json [pnpm]
{
  "scripts": {
    "prepare": "husky" // [!code hl]
  }
}
```

```json [yarn]
{
  "scripts": {
    "postinstall": "husky",
    // Add this if you're publishing to npmjs.com
    "prepack": "pinst --disable",
    "postpack": "pinst --enable"
  }
}
```

:::

Create a `pre-commit` file in `husky/` directory

::: code-group

```shell [npm]
# .husky/pre-commit
npm test
```

```shell [pnpm]
# .husky/pre-commit
pnpm test
```

```shell [yarn]
# .husky/pre-commit
yarn test
```
:::

Kudos, you've succesfully setup your first Git hook 🎉

## Try it

Make a commit

```shell
git commit -m "Keep calm and commit"
# test script will run every time you commit
```

## Uninstall

::: code-group

```shell [npm]
npm uninstall husky
git config --unset core.hooksPath
```

```shell [pnpm]
pnpm uninstall husky
git config --unset core.hooksPath
```

```shell [yarn]
yarn remove husky
git config --unset core.hooksPath
```

:::
