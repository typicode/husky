![npm](https://img.shields.io/npm/dm/husky)

> 超高速でモダンなネイティブ git フック

Husky はあなたのコミットを更に強化します 🐶 _ウー!_

コミットやプッシュ時に、**コミットメッセージやコードを自動的にlint**し、**テストを実行**します。

まずは [ここ](./get-started.md) から。

## 特徴

- わずか `2 kB` (📦 _gzip圧縮_)、依存関係なし
- 軽量なため最速 (`~1ms`で動作)
- Git の新機能を使用 (`core.hooksPath`)
- サポート:
  - macOS, Linux, Windows
  - Git GUI, Node バージョン・マネージャ, カスタムフックディレクトリ, ネストされたプロジェクト, モノレポ
  - [クライアントサイドの Git フック 全13種](https://git-scm.com/docs/githooks)

その他にも:

- ブランチ特有のフック
- POSIX shell を使った高度なスクリプト
- Git ネイティブのフック構成に従う
- `prepare` スクリプトを使った [npm](https://docs.npmjs.com/cli/v10/using-npm/scripts#best-practices) のベストプラクティスに合わせる
- オプトイン/オプトアウト オプション
- グローバルに無効化可能
- ユーザーフレンドリーなエラーメッセージ

## スポンサー

[ここ](https://github.com/sponsors/typicode) からスポンサーになってこのプロジェクトを支援する 💖

### スペシャル・スポンサー

<p align="center">
  <a href="https://app.tea.xyz/sign-up?r=8L2HWfJB6hs">
    <img src="https://github.com/typicode/husky/assets/5502029/1b95c571-0157-48bc-a147-0d8d2fbc1d8a" /><br/>
    オープンソースへ貢献して報酬を得よう
  </a>
</p>

### GitHub

<p align="center">
  <a href="./sponsorkit/sponsors.svg">
    <img src='./sponsorkit/sponsors.svg'/>
  </a>
</p>

### Open Collective

<a href="https://opencollective.com/husky/tiers/company/0/website"><img src="https://opencollective.com/husky/tiers/company/0/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/1/website"><img src="https://opencollective.com/husky/tiers/company/1/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/2/website"><img src="https://opencollective.com/husky/tiers/company/2/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/3/website"><img src="https://opencollective.com/husky/tiers/company/3/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/4/website"><img src="https://opencollective.com/husky/tiers/company/4/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/5/website"><img src="https://opencollective.com/husky/tiers/company/5/avatar.svg?avatarHeight=120"></a>
[![image](https://github.com/user-attachments/assets/b9c5a918-70fc-4615-ae7d-e7e5bc3c66e8)](https://www.sanity.io/)

## 使用者

Husky は、 GitHub の[**150万以上のプロジェクト**](https://github.com/typicode/husky/network/dependents?package_id=UGFja2FnZS0xODQzNTgwNg%3D%3D)で使用されています:

- [vercel/next.js](https://github.com/vercel/next.js)
- [vercel/hyper](https://github.com/vercel/hyper)
- [webpack/webpack](https://github.com/webpack/webpack)
- [angular/angular](https://github.com/angular/angular)
- [facebook/docusaurus](https://github.com/facebook/docusaurus)
- [microsoft/vscode](https://github.com/microsoft/vscode)
- [11ty/eleventy](https://github.com/11ty/eleventy)
- [stylelint/stylelint](https://github.com/stylelint/stylelint)
- [colinhacks/zod](https://github.com/colinhacks/zod)
- [rollup/rollup](https://github.com/rollup/rollup)
- [tinyhttp/tinyhttp](https://github.com/tinyhttp/tinyhttp)
- ...

## 記事

- [Why husky has dropped conventional JS config](https://blog.typicode.com/posts/husky-git-hooks-javascript-config/)
- [Why husky doesn't autoinstall anymore](https://blog.typicode.com/posts/husky-git-hooks-autoinstall/)
