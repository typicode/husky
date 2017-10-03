# Documentation

## Available hooks

`husky` supports all Git hooks (https://git-scm.com/docs/githooks).

## Sub-directory package

```
project
  subproject
    package.json
```

Create a root `package.json` and run `npm install husky --save-dev`, then edit `package.json` to configure `husky`:

```
{
  "private": true,
  "devDependencies": {
    "husky": "..."
  },
  "husky": {
    "hooks": {
      "pre-commit": "cd subproject && npm test"
    }
  }
}
```

One of the downside of this approach is that you'll have to run `npm install` in `project` and `subproject`. If you only have one package and you're __not publishing it__, you can do the following to ensure that `husky` is also installed when you run `npm install` in your subdirectory:

```
{
  "private": true,
  "scripts": {
    "postinstall": "cd .. && npm install"
  }
}

## Multi-package repository

If you have a multi-package repository (or monorepo), like that:

```
project
  packages
    A/package.json
    B/package.json
    C/package.json

it's recommended to use tools like [lerna](https://github.com/lerna/lerna) and have `husky` installed in the root `package.json`:

{
  "private": true,
  "devDependencies": {
    "husky": "..."
  },
  "husky": {
    "hooks": {
      "pre-commit": "lerna run ..."
    }
  }
}

## Options

### skipInstall

Default: false

By default, `husky` will automatically install hooks in `.git/hooks`. You can disable it by setting `skipInstall` to `true` or `HUSKY_SKIP_INSTALL` environment variable.

```
{
  "husky": {
    "skipInstall": true
  }
}
```

To manually install hooks, you can run `node ./node_modules/husky/husky install` and to uninstall `node ./node_modules/husky/husky uninstall`.

Though, if you run `npm uninstall husky`, it will still automatically revert `.git/hooks` to its previous state. 

### skipCI

Default: true

By default, `husky` won't install Git hooks in CI environments.

