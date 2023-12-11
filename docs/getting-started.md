# Getting started

## Install

::: code-group

```shell [npm]
npm install --save-dev husky
```

```shell [pnpm]
pnpm add --save-dev husky
```

```shell [yarn]
yarn add husky --dev
yarn add pinst --dev # ONLY if your package is not private
```

```shell [bun]
bunx husky-init && bun install
```

:::

## Quick start


::: code-group

```shell [npm]
npm exec husky init
```

```shell [pnpm]
pnpm exec husky init
```

```shell [yarn]
# Due to caveats and differences with other package managers,
# please use the manual setup below.
```

```shell [deno]
deno run --allow-read --allow-write --allow-env --allow-run :npm:husky 
```

:::

Husky comes with an `init` command to quickly setup a new project. It will create a `pre-commit` script and change `prepare` script in `package.json`. You can easily modify things after to fit your workflow.

## Manual setup

### 1. Edit package.json

Git needs to be configured and husky needs to setup some files in `.husky/`. For this, you need to run `husky` command once in your repo.

The recommended approach is to put it in `prepare` script in `package.json`, this way it will be automatically done after each install. 

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
    // Yarn doesn't support prepare script
    "postinstall": "husky",
    // Add this if you're publishing to npmjs.com
    "prepack": "pinst --disable",
    "postpack": "pinst --enable"
  }
}
```

:::

Run `prepare` once.

::: code-group

```sh [npm]
npm run prepare
```

```sh [pnpm]
pnpm run prepare
```

```sh [yarn]
yarn run prepare
```

:::

### 2. Create a Git hook

Create a `pre-commit` file in `.husky/` directory

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


_For advanced usage, see [recipes](recipes)._

## Try it

__Congrats!__ you've succesfully setup your first Git hook in just one line of code 🎉.
Let's try it now.

```shell
git commit -m "Keep calm and commit"
# test script will run every time you commit
```
