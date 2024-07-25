#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky
expect_hooksPath_to_be ".husky/_"

git add package.json
echo "echo \"pre-commit\"" > .husky/pre-commit

# Should not fail if set -u is used
mkdir -p config/husky
echo "set -u" > config/husky/init.sh
XDG_CONFIG_HOME="$(pwd)/config" expect 0 "git commit -m foo"