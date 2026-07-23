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

### GitHub

<p align="center">
  <a href="http://git-tower.com/?utm_source=husky&utm_medium=referral">
    <img height="100" style="height: 100px; width: auto; max-width: none;" alt="Git Tower" src="https://camo.githubusercontent.com/4b4d0ae4ec27fe8591b575c86fe21c562f34926893272dccc05fbf0447d38694/68747470733a2f2f6a736f6e706c616365686f6c6465722e74797069636f64652e636f6d2f746f7765722d69636f6e2d616e642d6c6f676f2d31343030783236302e706e67" />
  </a>
</p>

<p align="center">
  <a href="https://serpapi.com/?utm_source=typicode">
    <img height="100" style="height: 100px; width: auto; max-width: none;" src="https://github.com/user-attachments/assets/52b3039d-1e4c-4c68-951c-93f0f1e73611" alt="SerpApi" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/typicode/husky/blob/main/docs/sponsorkit/sponsors.svg">
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
