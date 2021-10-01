# husky

> Modern native Git hooks made easy

Husky improves your commits and more 🐶 _woof!_

# Install

```
npm install husky --save-dev
```

# Usage

Add a prepare script to package json and run

```sh
npm set-script prepare "husky install" # adds a prepare script
npm run prepare # runs the script
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
