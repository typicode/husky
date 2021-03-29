. "$(dirname "$0")/_functions.sh"
setup
install

# Should not fail
rm -rf .git
expect 0 "npx --no-install husky install"
