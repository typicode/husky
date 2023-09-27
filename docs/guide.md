# Guide

## Monorepo

It's recommended to add husky in the root `package.json`.

## Custom directory

If you want to install husky in another directory, for example `.config`, you can pass it to `install` command. For example:

```json
{
  "scripts": {
    "prepare": "husky -d .config/husky"
  }
}
```

Another case you may be in is if your `package.json` file and `.git` directory are not at the same level. For example, `project/.git` and `project/front/package.json`.

By design, `husky install` must be run in the same directory as `.git`, but you can change directory during `prepare` script and pass a subdirectory:

```json
{
  "scripts": {
    "prepare": "cd .. && husky -d front/.husky"
  }
}
```

In your hooks, you'll also need to change directory:

```shell
# .husky/pre-commit
# ...
cd front
npm test
```

## Bypass hooks

You can bypass `pre-commit` and `commit-msg` hooks using Git `-n/--no-verify` option:

```shell
git commit -m "yolo!" --no-verify
```

For Git commands that don't have a `--no-verify` option, you can use `HUSKY` environment variable:

```shell
HUSKY=0 git push # yolo!
```

## Disable husky in CI/Docker/Prod

There's no right or wrong way to disable husky in CI/Docker/Prod context and is highly **dependent on your use-case**.

### With npm

If you want to prevent husky from installing completely, you can specifically disable `prepare` script with:

```shell
npm pkg delete scripts.prepare
npm ci --omit=dev
```

Alternatively, you can ignore scripts during installation. Be cautious, this argument ignores dependencies scripts as well.

```shell
npm ci --omit=dev --ignore-scripts
```

When using `--omit=dev`, `npm` will set `NODE_ENV` to `production` for lifecycle scripts, so another alternative is to check it to conditionally install husky.

```shell
npm pkg set scripts.prepare="node -e \"if (process.env.NODE_ENV !== 'production') { require('husky').install() }\""
```

### With a custom script

You can create a custom JS script and conditionally require husky and install hooks.

::: code-group

```json [package.json]
"prepare": "node ./prepare.js"
```

```js [prepare.js]
const isCi = process.env.CI !== undefined
if (!isCi) {
  require('husky').install()
}
```

:::

Or make `prepare` script fail silently if husky is not installed:

```json [package.json]
"prepare": "node -e \"try { require('husky').default() } catch (e) {if (e.code !== 'MODULE_NOT_FOUND') throw e}\""
```

### With env variables

You can set `HUSKY` environment variable to `0` in your CI config file, to disable hooks installation.

Alternatively, most Continuous Integration Servers set a `CI` environment variable. You can use it in your hooks to detect if it's running in a CI.

::: code-group

```shell [.husky/pre-commit]
# ...
[ -n "$CI" ] && exit 0
```

:::

### With is-ci

You can also use [is-ci](https://github.com/watson/is-ci) in your `prepare` script to conditionally install husky

```shell
npm install is-ci --save-dev
```

::: code-group

```js [package.json]
{
  "scripts": {
    "prepare": "is-ci || husky"
  }
}
```

:::

## Testing hooks without commiting

If you want to test a hook, you can add `exit 1` at the end of the script to abort git command.

::: code-group

```shell [.husky/pre-commit]
# ...
exit 1 # Commit will be aborted
```

:::
