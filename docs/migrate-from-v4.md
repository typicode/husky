# Migrate from v4

If you were calling `package.json` scripts using `npm` or `yarn`, **you can simply copy your commands** from your config file to the corresponding hook:

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
# Note that you can now have commands on multiple lines
npm test // [!code hl]
npm run foo // [!code hl]
```

If you were calling locally installed binaries, **you need to run them via your package manager now**:

::: code-group

```js [.huskyrc.json (v4)]
{
  "hooks": {
    "pre-commit": "jest"
  }
}
```

```shell [.husky/pre-commit (v9)]
jest
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

```shell [.husky/commit-msg (v9)]
commitlint --edit $1
```

:::

Other environment variables changes:

- `HUSKY_SKIP_HOOKS` is replaced by `HUSKY`.
- `HUSKY_SKIP_INSTALL` is replaced by `HUSKY`.
- `HUSKY_GIT_PARAMS` is removed. Instead Git parameters should be used directly in scripts (e.g. `$1`).