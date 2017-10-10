# Documentation

## Supported hooks

`husky` supports all Git hooks (https://git-scm.com/docs/githooks) and Git params can be accessed using `GIT_PARAMS` environment variable.

## How to

### Sub-directory package

If your project is in a sub-directory:

```
project
  subproject
    package.json
```

Create a root `package.json`, run `npm install husky --save-dev` and edit `package.json` to configure `husky`:

```js
// project/package.json
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

```js
// project/subproject/package.json
{
  "private": true,
  "scripts": {
    "postinstall": "cd .. && npm install"
  }
}
```

### Multi-package repository (monorepo)

If you have a multi-package repository:

```sh
project
  packages
    A/package.json
    B/package.json
    C/package.json
```

It's recommended to use tools like [lerna](https://github.com/lerna/lerna) and have `husky` installed in the root `package.json`:

```json
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

```json
{
  "husky": {
    "skipCI": false
  }
}
```

### skipCI

Default: true

By default, `husky` won't install Git hooks in CI environments.

