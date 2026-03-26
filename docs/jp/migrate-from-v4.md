# v4からの移行

`npm` や `yarn`　を使って `package.json` の scripts を呼び出していた場合、
設定ファイルから対応するフックに**コマンドをコピーするだけ**です:

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
# 複数行にコマンドを記述できるようになったことに注意してください
npm test // [!code hl]
npm run foo // [!code hl]
```

ローカルにインストールされたバイナリを呼び出していた場合は、
**パッケージマネージャー経由で実行する必要**があります:

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

環境変数 `HUSKY_GIT_PARAMS` は、ネイティブのパラメータ `$1`、`$2` などで置き換えられるようになりました。

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

その他の環境変数の変更:

- `HUSKY_SKIP_HOOKS` は `HUSKY` に置き換えられました
- `HUSKY_SKIP_INSTALL` は `HUSKY` に置き換えられました
- `HUSKY_GIT_PARAMS` は削除されました。代わりに、 Git パラメータをスクリプトで直接使うようになりました。 (例: `$1`)