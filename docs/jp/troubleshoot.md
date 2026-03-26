# トラブルシュート

## コマンドが見つかりません

解決方法については、[方法](./how-to.md)を参照してください。

## フックが実行されない

1. ファイル名が正しいか確認してください。例えば, `precommit` や `pre-commit.sh` は無効な名前です。有効なファイル名については、 Git フックの[ドキュメント](https://git-scm.com/docs/githooks)を参照してください
2. `git config core.hooksPath` を実行して、 `.husky/_` (または、カスタムフックディレクトリ) を指していることを確認してください
3. Git のバージョンが `2.9` 以上であることを確認してください

## アンインストール後に `.git/hooks/` が動作しない

`husky` のアンインストール後に、 `.git/hooks/`  にあるフックが動作しない場合には、 `git config --unset core.hooksPath` を実行してください。

## Windows 上の Yarn

Windows で Git Bash (標準入力が tty でない)を使って Yarn を実行すると、 Git フックが失敗することがあります。 Windows ユーザーの方は、この回避策を実行してください:

1. `.husky/common.sh` を作成する:

```shell
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Windows 10, Git Bash, Yarn のための回避策
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

2. Yarn コマンドが実行されるソース:

```shell
# .husky/pre-commit
. .husky/common.sh

yarn ...
```
