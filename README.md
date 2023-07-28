# husky

> Modern native Git hooks made easy

Husky improves your commits and more 🐶 *woof!*

# Install

```
npm install husky --save-dev
```
# Enable Git hooks

```sh
npx husky install
```

# Usage

Edit `package.json > prepare` script and run it once:

```sh
npm pkg set scripts.prepare="husky install"
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
# `npm test` will run
```

# Documentation

https://typicode.github.io/husky
