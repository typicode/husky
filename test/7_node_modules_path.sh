#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky

# Test pre-commit
git add package.json
# Should not fail when running hook
echo 'echo "$PATH" | grep "node_modules/.bin"' > .husky/pre-commit
expect 0 "git commit -m foo"
