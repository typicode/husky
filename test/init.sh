# shellcheck shell=bash

# shellcheck source=./_functions.sh
. "$(dirname "$0")/_functions.sh"

title "init"
tempDir="/tmp/husky-default-test"

rm -rf $tempDir
cd_and_install_tgz $tempDir

init_git
npx --no husky init
npm set-script test "echo \"msg from pre-commit hook\" && exit 1"

# Debug
# cat .husky/*

# Test core.hooksPath
test_hooksPath ".husky"

# Test pre-commit
git add package.json
git commit -m "should fail" || echo -e "\e[0;32mOK\e[m"

# Uninstall
npx --no husky uninstall
git config core.hooksPath || echo -e "\e[0;32mOK\e[m"
