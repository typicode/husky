# Documentation

## Supported hooks

`husky` supports all Git hooks defined [here](https://git-scm.com/docs/githooks).

## Access Git params and stdin

You can access them using `HUSKY_GIT_PARAMS` and `HUSKY_GIT_STDIN` environment variables.

## Disable auto-install

If you don't want `husky` to automatically install Git hooks, simply set `HUSKY_SKIP_INSTALL` environment variable to `true`.

```
HUSKY_SKIP_INSTALL=true npm install
```

## Multi-package repository (monorepo)

If you have a multi-package repository, it's recommended to use tools like [lerna](https://github.com/lerna/lerna) and have `husky` installed ONLY in the root `package.json` to act as the source of truth.
Generally speaking, you should avoid defining `husky` in multiple `package.json`, as each package would overwrite previous `husky` installations.

```sh
.
└── root
    ├── .git
    ├── package.json 🐶 # Add husky here
    └── packages
        ├── A
        │   └── package.json
        ├── B
        │   └── package.json
        └── C
            └── package.json
```

```js
// root/package.json
{
  "private": true,
  "devDependencies": {
    "husky": "..."
  },
  "husky": {
    "hooks": {
      "pre-commit": "lerna run test"
    }
  }
}
```
