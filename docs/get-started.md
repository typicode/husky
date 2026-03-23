# Get started

## Install

::: code-group

```sh [npm]
npm install --save-dev husky
```

```sh [pnpm]
pnpm add --save-dev husky
```

```sh [yarn]
yarn add --dev husky
# Add pinst ONLY if your package is not private
yarn add --dev pinst
```

```sh [bun]
bun add --dev husky
```

:::

## `husky init` (recommended)

The `init` command simplifies setting up husky in a project. It creates a `pre-commit` script in `.husky/` and updates the `prepare` script in `package.json`. Modifications can be made later to suit your workflow.

::: code-group

```sh [npm]
npx husky init
```

```sh [pnpm]
pnpm exec husky init
```

```sh [yarn]
# Due to specific caveats and differences with other package managers,
# refer to the How To section.
```

```sh [bun]
bunx husky init
```

:::

## Try it

Congratulations! You've successfully set up your first Git hook with just one command 🎉. Let's test it:

```sh
git commit -m "Keep calm and commit"
# test script will run every time you commit
```

## A few words...

### Scripting

While most of the time, you'll just run a few `npm run` or `npx` commands in your hooks, you can also script them using POSIX shell for custom workflows.

For example, here's how you can lint your staged files on each commit with only two lines of shell code and no external dependency:

```sh
# .husky/pre-commit
prettier $(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g') --write --ignore-unknown
git update-index --again
```

_This is a basic but working example, check [lint-staged](https://github.com/lint-staged/lint-staged) if you need more._

### Disabling hooks

Husky doesn't force Git hooks. It can be globally disabled (`HUSKY=0`) or be opt-in if wanted. See the [How To](how-to) section for manual setup and more information.
