# husky

[![Open Collective](https://opencollective.com/husky/all/badge.svg?label=financial+contributors)](https://opencollective.com/husky) [![](https://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![Node.js CI](https://github.com/typicode/husky/workflows/Node.js%20CI/badge.svg)](https://github.com/typicode/husky/actions)

> Modern native Git hooks made easy

Husky improves your commits and more 🐶 *woof!*

# Usage

Edit `package.json > prepare` script:

```sh
npm set-script prepare "husky install"
```

Add a hook:

```sh
npx husky add .husky/pre-commit "npm test"
```

Make a commit:

```sh
$ git commit -m "Keep calm and commit"
```

For more use cases, see documentation.

## Documentation

https://typicode.github.io/husky

__Important__ Upgrading from v4 to v6 requires additional steps, please see the docs.

## License

MIT

## Companies

<a href="https://opencollective.com/husky/tiers/sponsor/0/website"><img src="https://opencollective.com/husky/tiers/sponsor/0/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/1/website"><img src="https://opencollective.com/husky/tiers/sponsor/1/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/2/website"><img src="https://opencollective.com/husky/tiers/sponsor/2/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/3/website"><img src="https://opencollective.com/husky/tiers/sponsor/3/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/4/website"><img src="https://opencollective.com/husky/tiers/sponsor/4/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/5/website"><img src="https://opencollective.com/husky/tiers/sponsor/5/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/sponsor/6/website"><img src="https://opencollective.com/husky/tiers/sponsor/6/avatar.svg" height="80px"></a>

[Become a sponsor and have your logo here and in the docs](https://opencollective.com/husky/contribute/sponsor-9986/checkout)

The full list of Sponsors can be viewed in the docs, on Open Collective and on GitHub sponsors.
