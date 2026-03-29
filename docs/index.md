![npm](https://img.shields.io/npm/dm/husky)

> Ultra-fast modern native git hooks

Husky enhances your commits and more 🐶 _woof!_

Automatically **lint your commit messages**, **code**, and **run tests** upon committing or pushing.

Get started [here](./get-started.md).

## Features

- Just `2 kB` (📦 _gzipped_) with no dependencies
- Fastest due to being lightweight (runs in `~1ms`)
- Uses new Git feature (`core.hooksPath`)
- Supports:
  - macOS, Linux, Windows
  - Git GUIs, Node version managers, custom hooks directory, nested projects, monorepos
  - [All 13 client-side Git hooks](https://git-scm.com/docs/githooks)

And more:

- Branch-specific hooks
- Use POSIX shell to script advanced cases
- Adheres to Git's native hook organization
- Aligns with [npm](https://docs.npmjs.com/cli/v10/using-npm/scripts#best-practices) best practices using `prepare` script
- Opt-in/opt-out options
- Can be globally disabled
- User-friendly error messages

## Sponsors

Support this project by becoming a sponsor [here](https://github.com/sponsors/typicode) 💖

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

## Used by

Husky is used in [**over 1.5M projects**](https://github.com/typicode/husky/network/dependents?package_id=UGFja2FnZS0xODQzNTgwNg%3D%3D) on GitHub, including:

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

## Articles

- [Why husky has dropped conventional JS config](https://blog.typicode.com/posts/husky-git-hooks-javascript-config/)
- [Why husky doesn't autoinstall anymore](https://blog.typicode.com/posts/husky-git-hooks-autoinstall/)
