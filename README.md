# husky
<<<<<<< HEAD
=======
[![Open Collective](https://opencollective.com/husky/all/badge.svg?label=financial+contributors)](https://opencollective.com/husky) [![](https://img.shields.io/npm/dm/husky.svg?style=flat)](https://www.npmjs.org/package/husky) [![Node.js CI](https://github.com/typicode/husky/workflows/Node.js%20CI/badge.svg)](https://github.com/typicode/husky/actions)
>>>>>>> upstream/fix-ci

> Modern native Git hooks made easy

Husky improves your commits and more 🐶 *woof!*

# Install

```
npm install husky --save-dev
```

# Usage

Edit `package.json > prepare` script and run `prepare` script once:

```sh
<<<<<<< HEAD
npm pkg set scripts.prepare="husky install"
npm run prepare
=======
$ npm set-script prepare "husky install"
$ npm run prepare
>>>>>>> upstream/fix-ci
```

Add a hook:

```sh
<<<<<<< HEAD
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
=======
$ npx husky add .husky/pre-commit "npm test"
>>>>>>> upstream/fix-ci
```

Make a commit:

```sh
git commit -m "Keep calm and commit"
# `npm test` will run
```

# Documentation

https://typicode.github.io/husky
