# shellcheck shell=bash

# shellcheck source=./_functions.sh
. "$(dirname "$0")/_functions.sh"

title "set add"
tempDir="/tmp/husky-set-add"
f=".husky/pre-commit"

rm -rf $tempDir
cd_and_install_tgz $tempDir

init_git
npx --no-install husky install

npx --no-install husky add $f "foo"
grep -m 1 _ $f && grep foo $f && ok

npx --no-install husky add .husky/pre-commit "bar"
grep -m 1 _ $f && grep foo $f && grep bar $f && ok

npx --no-install husky set .husky/pre-commit "baz"
grep -m 1 _ $f && grep foo $f || grep bar $f || grep baz $f && ok

