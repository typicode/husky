# 始めましょう

## インストール

::: code-group

```shell [npm]
npm install --save-dev husky
```

```shell [pnpm]
pnpm add --save-dev husky
```

```shell [yarn]
yarn add --dev husky
# パッケージが private でない場合のみ、 pinst を追加してください
yarn add --dev pinst
```

```shell [bun]
bun add --dev husky
```

:::

## `husky init` (推奨)

`init` コマンドは、プロジェクトでの husky のセットアップを簡単にします。  `.husky/` に `pre-commit` スクリプトを作成し、 `package.json` の `prepare` スクリプトを更新します。ワークフローに合わせて後で修正することもできます。

::: code-group

```shell [npm]
npx husky init
```

```shell [pnpm]
pnpm exec husky init
```

```shell [yarn]
# 特定の注意事項や他のパッケージ・マネージャーとの違いがあるため、
# 方法セクションを参照してください
```

```shell [bun]
bunx husky init
```

:::


## 試してみる

おめでとうございます! たったひとつのコマンドで、最初の Git フックを設定することができました🎉。テストしてみましょう:

```shell
git commit -m "Keep calm and commit"
# コミットする度にテストスクリプトが実行されます
```

## ひと言...

### スクリプティング

ほとんどの場合、 `npm run` または `npx` コマンドをフックで実行するだけですが、 POSIX Shell を使ってスクリプト化し、カスタムワークフローを作成することもできます。

例えば、たった2行の Shell コードと外部依存なしで、コミット毎にステージファイルを lint する方法はこちらです:

```shell
# .husky/pre-commit
prettier $(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g') --write --ignore-unknown
git update-index --again
```

_これは基本的な、しかし実用的な例です。更に必要であれば、 [lint-staged](https://github.com/lint-staged/lint-staged) をチェックしてください。_

### フックを無効にする

Husky は Git フックを強制しません。必要に応じて、グローバルに無効にすること(`HUSKY=0`)やオプトインすることもできます。手動での設定や詳細については、[方法](./how-to.md)セクションを参照してください。