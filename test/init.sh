# shellcheck shell=bash

# shellcheck source=./_functions.sh
. "$(dirname "$0")/_functions.sh"

title "init"
tempDir="/tmp/husky-init-npm-test"

rm -rf $tempDir
cd_and_install_tgz $tempDir

init_git
npx --no-install husky init
npm set-script test "echo \"msg from pre-commit hook\" && exit 1"

# Test package.json scripts
grep '"prepare": "husky install"' package.json || ok

# Test core.hooksPath
test_hooksPath ".husky"

# Test pre-commit
git add package.json
git commit -m "should fail" || ok

# Uninstall
npx --no-install husky uninstall
git config core.hooksPath || ok
