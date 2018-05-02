# Documentation

## Supported hooks

`husky` supports all Git hooks defined [here](https://git-scm.com/docs/githooks).

## Access Git params

You can access them using `HUSKY_GIT_PARAMS` environment variable.

## Disable auto-install

If you don't want `husky` to automatically install Git hooks, simply set `HUSKY_SKIP_INSTALL` environment variable to `true`.

```
HUSKY_SKIP_INSTALL=true npm install
```

## Multi-package repository (monorepo)

If you have a multi-package repository:

```sh
.
└── root
    ├── .git
    ├── package.json 🐶 # Add husky here only
    └── packages
        ├── A
        │   └── package.json
        ├── B
        │   └── package.json
        └── C
            └── package.json
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
      "pre-commit": "lerna run test"
    }
  }
}
```
