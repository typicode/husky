#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky

# Test core.hooksPath
expect_hooksPath_to_be ".husky/_"

# Test pre-commit
git add package.json

# Try to run husky bin without npx
echo "husky" > .husky/pre-commit
expect 0 "git commit -m foo"

# Ensure that it fails if command is not found
echo "foo" >.husky/pre-commit
expect 1 "git commit -m foo"
