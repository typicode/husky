#!/bin/sh
. test/functions.sh
setup
install

# Should not setup hooks when HUSKY=0
HUSKY=0 npx --no-install husky
expect_hooksPath_to_be ""

# Should setup hooks
npx --no-install husky
expect_hooksPath_to_be ".husky/_"

# Should not commit
git add package.json
echo "echo \"pre-commit\" && exit 1" >.husky/pre-commit
expect 1 "git commit -m foo"

# Should commit when HUSKY=0
mkdir -p config/husky
echo "export HUSKY=0" > config/husky/init.sh
XDG_CONFIG_HOME="$(pwd)/config" expect 0 "git commit -m foo"