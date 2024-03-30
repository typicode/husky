![npm](https://img.shields.io/npm/dm/husky)

> 使现代的原生 Git 钩子变得简单

Husky 能使你的提交变得更好  🐶 _汪!_

在提交或推送时，自动化 **检查提交信息**、**检查代码** 和 **运行测试**。

从 [这里](./get-started.md) 快速开始。

[查看 v9 更新日志](https://github.com/typicode/husky/releases/tag/v9.0.1)去发现所有新特性！ 🚀

## 特性

- 仅有 `2 kB`（📦 _gzip 压缩后_），没有任何依赖。
- 非常快（运行速度约 `~1ms`）
- 使用新 Git 特性（`core.hooksPath`）
- 支持：
  - macOS、Linux、Windows
  - Git GUI、Node 版本管理器、自定义钩子目录、嵌套项目、Monorepos
  - [所有 13 个客户端 Git 钩子](https://git-scm.com/docs/githooks)

更多：
- Branch-specific 钩子
- 使用 POSIX shell 为高级案例编写脚本
- 遵循 Git 的原生钩子组织结构
- 使用 `prepare` 脚本与 [npm](https://docs.npmjs.com/cli/v10/using-npm/scripts#best-practices) 最佳实践保持一致
- Opt-in/opt-out 选项
- 用户友好的报错信息

## 赞助者

支持这个项目来成为一个赞助者 [点击此处](https://github.com/sponsors/typicode) 💖

### 特别赞助

<p align="center">
  <a href="https://app.tea.xyz/sign-up?r=8L2HWfJB6hs">
    <img src="https://github.com/typicode/husky/assets/5502029/1b95c571-0157-48bc-a147-0d8d2fbc1d8a" /><br/>
    Get rewards for your open-source contributions
  </a>
</p>

### GitHub

<p align="center">
  <a href="../sponsorkit/sponsors.svg">
    <img src='../sponsorkit/sponsors.svg'/>
  </a>
</p>

### Open Collective

<a href="https://opencollective.com/husky/tiers/company/0/website"><img src="https://opencollective.com/husky/tiers/company/0/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/1/website"><img src="https://opencollective.com/husky/tiers/company/1/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/2/website"><img src="https://opencollective.com/husky/tiers/company/2/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/3/website"><img src="https://opencollective.com/husky/tiers/company/3/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/4/website"><img src="https://opencollective.com/husky/tiers/company/4/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/5/website"><img src="https://opencollective.com/husky/tiers/company/5/avatar.svg?avatarHeight=120"></a>

## 谁在使用

Husky 在 GitHub 上用于[超过 130 万个项目](https://github.com/typicode/husky/network/dependents?package_id=UGFja2FnZS0xODQzNTgwNg%3D%3D)，包括：

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

## 相关文章

- [为什么 Husky 放弃了传统的 JS 配置](https://blog.typicode.com/posts/husky-git-hooks-javascript-config/)
- [为什么 Husky 不再自动安装了](https://blog.typicode.com/posts/husky-git-hooks-autoinstall/)
