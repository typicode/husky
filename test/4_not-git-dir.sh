. "$(dirname -- "$0")/functions.sh"
setup
install

# Should not fail
rm -rf .git
expect 0 "npx --no-install husky install"
