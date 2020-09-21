. $(dirname $0)/_functions.sh

title "default"

tempDir=/tmp/pre-commit-test

rm -rf $tempDir
install_tgz $tempDir

# TODO add some failing cases like .git doesn't exist

# Init git
init_git

# Install
npx --no-install husky install

# Add pre-commit
npx --no-install husky add pre-commit "echo \"msg from pre-commit hook\" && exit 1"

# Debug
# cat .husky/*

# Test core.hooksPath
test_hooksPath ".husky"

# Test pre-commit
git add package.json
git commit -m "should fail" || echo -e "\e[0;32mSUCCESS\e[m" && exit 0
