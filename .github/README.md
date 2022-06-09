# husky

[![Open Collective](https://opencollective.com/husky/all/badge.svg?label=financial+contributors)](https://opencollective.com/husky) [![](https://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![Node.js CI](https://github.com/typicode/husky/workflows/Node.js%20CI/badge.svg)](https://github.com/typicode/husky/actions)

> Modern native Git hooks made easy

Husky improves your commits and more 🐶 _woof!_

# Install

## Easy install (reccomended)

`husky-init` is a one-time command to configure a project with husky.

It installs husky into your project and auto-configures your package.json,
ensuring that every time you run `yarn|npm install` git is then configured to
use your hooks (so you don't have to worry about it again).

```shell
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2+
pnpm dlx husky-init && pnpm install # pnpm
```

It will:
* install husky
* modify `package.json` (adding a
[`prepare`](https://docs.npmjs.com/cli/v8/using-npm/scripts#prepare-and-prepublish)
script)
* create a sample `pre-commit` hook that you can edit. By default this runs
  `npm test` when you commit.

## Manual Install

1. Install `husky`

```shell
npm install husky --save-dev
yarn add --dev husky
```

2. Enable Git hooks

```shell
npx husky install # will configure git to use .husky/ by default
```

3. To automatically have Git hooks enabled after every npm/yarn install, edit
`package.json` to use one of the [npm/yarm lifecyle
hooks](https://docs.npmjs.com/cli/v8/using-npm/scripts#prepare-and-prepublish)
e.g. `prepare`.


```shell
npm pkg set scripts.prepare="husky install"
npm run prepare
```

You should have:

```js
// package.json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

## Documentation

https://typicode.github.io/husky

**Important** Upgrading from v4 to v7 requires migrating previous config, please see the docs.

## Articles

- [Why husky has dropped conventional JS config](https://blog.typicode.com/husky-git-hooks-javascript-config/)
- [Why husky doesn't autoinstall anymore](https://blog.typicode.com/husky-git-hooks-autoinstall/)

## License

MIT

# Sponsors

## Companies

Does your company use husky? Ask your manager or marketing team if your company would be interested in supporting this project.

<a href="https://opencollective.com/husky/tiers/company/0/website"><img src="https://opencollective.com/husky/tiers/company/0/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/1/website"><img src="https://opencollective.com/husky/tiers/company/1/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/2/website"><img src="https://opencollective.com/husky/tiers/company/2/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/3/website"><img src="https://opencollective.com/husky/tiers/company/3/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/4/website"><img src="https://opencollective.com/husky/tiers/company/4/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/5/website"><img src="https://opencollective.com/husky/tiers/company/5/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/6/website"><img src="https://opencollective.com/husky/tiers/company/6/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/7/website"><img src="https://opencollective.com/husky/tiers/company/7/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/8/website"><img src="https://opencollective.com/husky/tiers/company/8/avatar.svg?avatarHeight=120"></a>
<a href="https://opencollective.com/husky/tiers/company/9/website"><img src="https://opencollective.com/husky/tiers/company/9/avatar.svg?avatarHeight=120"></a>

## Individuals

Find husky helpful? Become a backer and show your appreciation with a monthly donation on [Open Collective](https://opencollective.com/husky). You can also tip with a one-time donation.

<a href="https://opencollective.com/husky" target="_blank"><img src="https://opencollective.com/husky/tiers/individual.svg?avatarHeight=32"/></a>

GitHub sponsors can be viewed on my [profile](https://github.com/typicode). All past and current Open Collective sponsors can be viewed on [here](https://opencollective.com/husky).
