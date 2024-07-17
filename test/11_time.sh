#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky

git add package.json
echo "echo pre-commit" > .husky/pre-commit
time git commit -m foo
