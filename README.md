# husky

> Modern native Git hooks made easy

Husky improves your commits and more 🐶 *woof!*

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

# Documentation

https://typicode.github.io/husky
