# husky

[![Open Collective](https://opencollective.com/husky/all/badge.svg?label=financial+contributors)](https://opencollective.com/husky) 

> Modern native Git hooks made easy

Husky improves your commits and more 🐶 *woof!*

# Usage

Edit `package.json > prepare` script and run it once:

```sh
npm set-script prepare "husky install" && npm run prepare
```

Add a hook:

```sh
npx husky add .husky/pre-commit "npm test"
```

Make a commit:

```sh
$ git commit -m "Keep calm and commit"
```

# Documentation

https://typicode.github.io/husky

__Important__ upgrading from v4 to v6 requires additional steps, please see the docs.

## License

MIT
