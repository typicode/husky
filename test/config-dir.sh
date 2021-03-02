# shellcheck shell=bash

# shellcheck source=./_functions.sh
. "$(dirname "$0")/_functions.sh"

# Example:
# .config/husky
title "config directory"
tempDir="/tmp/husky-config-dir-test"
configDir="$tempDir/.config"

rm -rf $tempDir
cd_and_install_tgz $tempDir
mkdir $configDir

init_git
npx --no-install husky install .config/husky
npx --no-install husky add .config/husky/pre-commit "echo \"msg from pre-commit hook\" && exit 1"

# Test core.hooksPath
test_hooksPath ".config/husky"

# Test pre-commit
git add package.json
git commit -m "should fail" || ok
