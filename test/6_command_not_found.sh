#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky

# Test core.hooksPath
expect_hooksPath_to_be ".husky/_"

# Test pre-commit with 127 exit code
git add package.json
echo "exit 127" > .husky/pre-commit
expect 1 "git commit -m foo"
