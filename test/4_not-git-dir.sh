#!/bin/sh
. test/functions.sh
setup
install

# Should not fail
rm -rf .git
expect 0 "npx --no-install husky"

mkdir .git
expect 0 "npx --no-install husky"
