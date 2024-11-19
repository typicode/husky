![npm](https://img.shields.io/npm/dm/husky)

> Ultra-fast modern native git hooks

Husky enhances your commits and more 🐶 _woof!_

Automatically **lint your commit messages**, **code**, and **run tests** upon committing or pushing.

Get started [here](/get-started.md).

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

### Special Sponsor

<p align="center">
  <a href="https://app.tea.xyz/sign-up?r=8L2HWfJB6hs">
    <img src="https://github.com/typicode/husky/assets/5502029/1b95c571-0157-48bc-a147-0d8d2fbc1d8a" /><br/>
    Get rewards for your open-source contributions
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
