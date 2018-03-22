# Documentation

## Supported hooks

`husky` supports all Git hooks defined [here](https://git-scm.com/docs/githooks).

## Access Git params

You can access them using `GIT_PARAMS` environment variable.

## Disable auto-install

If you don't want `husky` to automatically install Git hooks, simply set `HUSKY_SKIP_INSTALL` environment variable to `true`.

```
HUSKY_SKIP_INSTALL=true npm install
```

## Multi-package repository (monorepo)

If you have a multi-package repository:

```sh
project/
  package.json # Root package.json
  packages/
    A/
      package.json
    B/
      package.json
    C/
      package.json
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
```

## Sub-directory package

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
