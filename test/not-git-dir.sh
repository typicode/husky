# shellcheck shell=bash

# shellcheck source=./_functions.sh
. "$(dirname "$0")/_functions.sh"

title "not git dir"
tempDir="/tmp/husky-not-git-dir"

rm -rf $tempDir
cd_and_install_tgz $tempDir

# Should not fail
npx --no-install husky install && ok
