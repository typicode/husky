# husky

> Modern native Git hooks made easy

Husky enables you to keep your git hooks version controlled along with your code.

🐶 *woof!*

# Install

```
npm install husky --save-dev
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
