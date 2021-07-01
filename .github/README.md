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

<a href="https://opencollective.com/husky/tiers/company/0/website"><img src="https://opencollective.com/husky/tiers/company/0/avatar.svg" height="160px"></a>
<a href="https://opencollective.com/husky/tiers/company/1/website"><img src="https://opencollective.com/husky/tiers/company/1/avatar.svg" height="160px"></a>
<a href="https://opencollective.com/husky/tiers/company/2/website"><img src="https://opencollective.com/husky/tiers/company/2/avatar.svg" height="160px"></a>
<a href="https://opencollective.com/husky/tiers/company/3/website"><img src="https://opencollective.com/husky/tiers/company/3/avatar.svg" height="80px"></a>
<a href="https://opencollective.com/husky/tiers/company/4/website"><img src="https://opencollective.com/husky/tiers/company/4/avatar.svg" height="160px"></a>
<a href="https://opencollective.com/husky/tiers/company/5/website"><img src="https://opencollective.com/husky/tiers/company/5/avatar.svg" height="160px"></a>
<a href="https://opencollective.com/husky/tiers/company/6/website"><img src="https://opencollective.com/husky/tiers/company/6/avatar.svg" height="160px"></a>
<a href="https://opencollective.com/husky/tiers/company/7/website"><img src="https://opencollective.com/husky/tiers/company/7/avatar.svg" height="160px"></a>
<a href="https://opencollective.com/husky/tiers/company/8/website"><img src="https://opencollective.com/husky/tiers/company/8/avatar.svg" height="160px"></a>
<a href="https://opencollective.com/husky/tiers/company/9/website"><img src="https://opencollective.com/husky/tiers/company/9/avatar.svg" height="160px"></a>

## Individuals

Find husky helpful? Become a backer and show your appreciation with a monthly donation on [Open Collective](https://opencollective.com/husky). You can also tip with a one-time donation.

[![Husky Sponsor](https://opencollective.com/husky/backer/0/avatar)](https://opencollective.com/husky/backer/0/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/1/avatar)](https://opencollective.com/husky/backer/1/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/2/avatar)](https://opencollective.com/husky/backer/2/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/3/avatar)](https://opencollective.com/husky/backer/3/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/4/avatar)](https://opencollective.com/husky/backer/4/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/5/avatar)](https://opencollective.com/husky/backer/5/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/6/avatar)](https://opencollective.com/husky/backer/6/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/7/avatar)](https://opencollective.com/husky/backer/7/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/8/avatar)](https://opencollective.com/husky/backer/8/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/9/avatar)](https://opencollective.com/husky/backer/9/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/10/avatar)](https://opencollective.com/husky/backer/10/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/11/avatar)](https://opencollective.com/husky/backer/11/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/12/avatar)](https://opencollective.com/husky/backer/12/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/13/avatar)](https://opencollective.com/husky/backer/13/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/14/avatar)](https://opencollective.com/husky/backer/14/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/15/avatar)](https://opencollective.com/husky/backer/15/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/16/avatar)](https://opencollective.com/husky/backer/16/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/17/avatar)](https://opencollective.com/husky/backer/17/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/18/avatar)](https://opencollective.com/husky/backer/18/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/19/avatar)](https://opencollective.com/husky/backer/19/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/20/avatar)](https://opencollective.com/husky/backer/20/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/21/avatar)](https://opencollective.com/husky/backer/21/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/22/avatar)](https://opencollective.com/husky/backer/22/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/23/avatar)](https://opencollective.com/husky/backer/23/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/24/avatar)](https://opencollective.com/husky/backer/24/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/25/avatar)](https://opencollective.com/husky/backer/25/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/26/avatar)](https://opencollective.com/husky/backer/26/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/27/avatar)](https://opencollective.com/husky/backer/27/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/28/avatar)](https://opencollective.com/husky/backer/28/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/29/avatar)](https://opencollective.com/husky/backer/29/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/30/avatar)](https://opencollective.com/husky/backer/30/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/31/avatar)](https://opencollective.com/husky/backer/31/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/32/avatar)](https://opencollective.com/husky/backer/32/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/33/avatar)](https://opencollective.com/husky/backer/33/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/34/avatar)](https://opencollective.com/husky/backer/34/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/35/avatar)](https://opencollective.com/husky/backer/35/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/36/avatar)](https://opencollective.com/husky/backer/36/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/37/avatar)](https://opencollective.com/husky/backer/37/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/38/avatar)](https://opencollective.com/husky/backer/38/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/39/avatar)](https://opencollective.com/husky/backer/39/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/40/avatar)](https://opencollective.com/husky/backer/40/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/41/avatar)](https://opencollective.com/husky/backer/41/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/42/avatar)](https://opencollective.com/husky/backer/42/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/43/avatar)](https://opencollective.com/husky/backer/43/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/44/avatar)](https://opencollective.com/husky/backer/44/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/45/avatar)](https://opencollective.com/husky/backer/45/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/46/avatar)](https://opencollective.com/husky/backer/46/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/47/avatar)](https://opencollective.com/husky/backer/47/website)
[![Husky Sponsor](https://opencollective.com/husky/backer/48/avatar)](https://opencollective.com/husky/backer/48/website)

GitHub sponsors can be viewed on my [profile](https://github.com/typicode). All past and current Open Collective sponsors can be viewed on [here](https://opencollective.com/husky).
