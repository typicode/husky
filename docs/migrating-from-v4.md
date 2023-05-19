# Migrating from v4

## CLI

See [husky-4-to-8](https://github.com/typicode/husky-4-to-8) CLI to quickly migrate from v4 to v8.

## Manually

If you were calling `package.json` scripts using `npm` or `yarn`, **you can simply copy your commands** from your config file to the corresponding hook:

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

If you were calling locally installed binaries, **you need to run them via your package manager now**:

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

`HUSKY_GIT_PARAMS` environment variable is replaced now by native params `$1`, `$2`, etc.

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

Other environment variables changes:

- `HUSKY_SKIP_HOOKS` is replaced by `HUSKY`.
- `HUSKY_SKIP_INSTALL` is replaced by `HUSKY`.
- `HUSKY_GIT_PARAMS` is removed. Instead Git parameters should be used directly in scripts (e.g. `$1`).
- `PATH` for locally installed tools is not automatically set anymore. You'll need to use your package manager to run them.
