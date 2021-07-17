# husky

[![Open Collective](https://opencollective.com/husky/all/badge.svg?label=financial+contributors)](https://opencollective.com/husky) [![](https://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![Node.js CI](https://github.com/typicode/husky/workflows/Node.js%20CI/badge.svg)](https://github.com/typicode/husky/actions)

> Modern native Git hooks made easy

Husky improves your commits and more 🐶 _woof!_

# Install

```
npm install husky -D
```

# Usage

Edit `package.json > prepare` script and run it once:

```sh
npm set-script prepare "husky install"
npm run prepare
```

Add a hook:

```sh
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```

Make a commit:

```sh
git commit -m "Keep calm and commit"
# `npm test` will run every time you commit
```

_For more use cases (project in sub-directory, custom directory, CI support, ...), see documentation._

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
