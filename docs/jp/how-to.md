# 方法

## 新しいフックの追加

フックの追加はファイルの作成と同じくらい簡単です。お気に入りのエディターやスクリプト、あるいは基本的な echo コマンドを使って行うことができます。例えば、 Linux/macOS の場合:
```shell
echo "npm test" > .husky/pre-commit
```

## 起動ファイル

Husky では、フックを実行する前にローカルコマンドを実行することができます。これらのファイルからコマンドを読み込みます:

- `$XDG_CONFIG_HOME/husky/init.sh`
- `~/.config/husky/init.sh`
- `~/.huskyrc` (非推奨)

Windows の場合: `C:\Users\yourusername\.config\husky\init.sh`

## Git フックのスキップ

### 単一のコマンドの場合

ほとんどの Git コマンドには、フックをスキップする `-n/--no-verify` オプションがあります:

```sh
git commit -m "..." -n # Git フックをスキップ
```

このフラグがないコマンドでは、 HUSKY=0 で一時的にフックを無効にします:

```shell
HUSKY=0 git ... # 全ての Git フック を一時的に無効にする
git ... # フックが再度動く
```

### 複数のコマンドの場合

長期間フックを無効にする (リベース/マージ中など):

```shell
export HUSKY=0 # 全ての Git フック を無効にする
git ...
git ...
unset HUSKY # フックを再度有効にする
```

### GUI または グローバル

GUI クライアントまたはグローバルで Git フックを無効にするには、 husky の設定を変更します:

```sh
# ~/.config/husky/init.sh
export HUSKY=0 # Husky がマシンにインストールされず、フックも実行されない
```

## CIサーバ と Docker

Git フックを CI サーバや Docker にインストールしないようにするには、 `HUSKY=0` を使います。例えば、 GitHub Actions では:

```yml
# https://docs.github.com/en/actions/learn-github-actions/variables
env:
  HUSKY: 0
```

( `devDependencies` ではなく) `dependencies` のみをインストールする場合、 `"prepare": "husky"` スクリプトは Husky がインストールされないため、失敗する可能性があります。

複数の解決策があります。

失敗することがないように `prepare` スクリプトを修正する:

```json
// package.json
"prepare": "husky || true"
```

それでも出力に `command not found` というエラーメッセージが表示され、混乱するかもしれません。表示させないようにするには、 `.husky/install.mjs` を作成してください:

```js
// 本番環境と CI で Husky のインストールをスキップする
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}
const husky = (await import('husky')).default
console.log(husky())
```

そして、それを `prepare` で使用します:

```json
"prepare": "node .husky/install.mjs"
```

## コミットせずにフックをテストする

フックをテストするには、フックスクリプトに `exit 1` を追加して Git コマンドを中断させます:

```shell
# .husky/pre-commit

# あなたの作業中スクリプト
# ...

exit 1
```

```shell
git commit -m "testing pre-commit code"
# コミットは作成されない
```

## Git のルートディレクトリにプロジェクトがない

Husky はセキュリティ上の理由から、親ディレクトリ(`../`)にはインストールされません。ただし、 `prepare` スクリプトでディレクトリを変更することができます。

このプロジェクトの構成を考えてみましょう:

```
.
├── .git/
├── backend/  # package.json がない
└── frontend/ # husky を使用した package.json がある
```

prepare スクリプトを次のように設定します:

```json
"prepare": "cd .. && husky frontend/.husky"
```

フックスクリプトで、ディレクトリを関連するサブディレクトリに戻します:

```shell
# frontend/.husky/pre-commit
cd frontend
npm test
```

## shell ではないフック

スクリプト言語の使用を必要とするスクリプトを実行するには、該当するフック毎に以下のパターンを使用します:

( `pre-commit` フックと NodeJS を使用した例)
1. フックのエントリーポイントを作る:
    ```shell
    .husky/pre-commit
    ```
2. 作成したファイルに以下を追加する
    ```shell
    node .husky/pre-commit.js
    ```
3. `.husky/pre-commit.js` の中
   ```javascript
   // あなたの NodeJS コード
   // ...
   ```

## Bash

フックスクリプトは、( Windows ユーザーなど)全ての人が `bash` を使っているわけではないので、十分な互換性を確保するために POSIX 準拠である必要があります。

とはいえ、もしあなたのチームが Windows を使わないのであれば、次のように Bash を使うことができます:

```shell
# .husky/pre-commit

bash << EOF
# 中に bash のスクリプトを入れる
# ...
EOF
```

## Node バージョン・マネージャーと GUI

バージョン・マネージャー(`nvm`, `n`, `fnm`, `asdf`, `volta` など)を使って Node をインストールした GUI で Git フックを使っている場合、環境変数 `PATH` の問題で `command not found` エラーに直面するかもしれません。

### `PATH` とバージョン・マネージャーを理解する

`PATH` はディレクトリのリストを含む環境変数です。 Shell はこれらのディレクトリを検索してコマンドを探します。コマンドが見つからなければ、 `command not found` というメッセージが表示されます。

Shell で `echo $PATH` を実行すると、その内容が表示されます。

バージョン・マネージャーは次のように動作します:
1. Shell のスタートアップファイル(`.zshrc`, `.bashrc` など)に初期化コードを追加し、ターミナルを開く度に実行する。
2. ホームフォルダ内のディレクトリに Node のバージョンをダウンロードする。

例えば、2つの Node バージョンが入っている場合:

```shell
~/version-manager/Node-X/node
~/version-manager/Node-Y/node
```

ターミナルを開くとバージョン・マネージャーが初期化され、バージョン(例えば `Node-Y` )を選び、そのパスを `PATH` の前に追加します:

```shell
echo $PATH
# 出力
~/version-manager/Node-Y/:...
```

今、 Node は `Node-Y` を参照しています。 `Node-X` に切り替えると、それに応じて `PATH` も変更されます:

```shell
echo $PATH
# 出力
~/version-manager/Node-X/:...
```

この問題は、ターミナルの外で起動した GUI がバージョン・マネージャーを初期化せず、 `PATH` に Node のインストール・パスが残らないため発生します。そのため、 GUI から Git フックはしばしば失敗します。

### 解決方法

Husky のソース `~/.config/husky/init.sh` を各 Git フックの前にコピーします。バージョン・マネージャーの初期化コードをここにコピーして、 GUI で実行できるようにします。

`nvm` を使った例:

```shell
# ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # これは nvm をロードします
```

あるいは、 Shell のスタートアップファイルが高速で軽量であれば、それを直接ソースにします:

```shell
# ~/.config/husky/init.sh
. ~/.zshrc
```

## 手動セットアップ

Git を設定し、 husky が `.husky/` にファイルをセットアップする必要があります。

リポジトリで `husky`コマンドを一度実行します。理想的には、 `package.json` の `prepare` スクリプトにこのコマンドを含めて、インストールの度に自動実行するようにします(推奨)。

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
    // Yarn は prepare スクリプトをサポートしていません
    "postinstall": "husky",
    // npmjs.com に publish する場合は、これを含めます
    "prepack": "pinst --disable",
    "postpack": "pinst --enable"
  }
}
```

```json [bun]
{
  "scripts": {
    "prepare": "husky" // [!code hl]
  }
}
```

:::

一度 `prepare` を実行します:

::: code-group

```sh [npm]
npm run prepare
```

```sh [pnpm]
pnpm run prepare
```

```sh [yarn]
# Yarn は prepare スクリプトをサポートしていません
yarn run postinstall
```

```sh [bun]
bun run prepare
```

:::

`.husky/` ディレクトリに `pre-commit` ファイルを作成します:

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

```sh [bun]
# .husky/pre-commit
bun test
```

:::
