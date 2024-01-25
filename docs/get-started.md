# Get started

## Install

::: code-group

```shell [npm]
npm install --save-dev husky
```

```shell [pnpm]
pnpm add --save-dev husky
```

```shell [yarn]
yarn add --dev husky
# Add pinst ONLY if your package is not private
yarn add --dev pinst
```

```shell [bun]
bun add --dev husky
```

:::

## `husky init` (recommended)

The `init` command simplifies setting up husky in a project. It creates a `pre-commit` script in `.husky/` and updates the `prepare` script in `package.json`. Modifications can be made later to suit your workflow.

::: code-group

```shell [npm]
npx husky init
```

```shell [pnpm]
pnpm exec husky init
```

```shell [yarn]
# Due to specific caveats and differences with other package managers,
# refer to the How To section.
```

```shell [bun]
bunx husky init
```

:::


## Try it

Congratulations! You've successfully set up your first Git hook with just one command 🎉. Let's test it:

```shell
git commit -m "Keep calm and commit"
# test script will run every time you commit
```

_For manual setup and more information, see the [How To](how-to) section._

