. "$(dirname -- "$0")/functions.sh"
setup
install

npx --no-install husky install

# Test core.hooksPath
expect_hooksPath_to_be ".husky"

# Test pre-commit
git add package.json
npx --no-install husky add .husky/pre-commit "echo \"pre-commit\" && exit 1"
expect 1 "git commit -m foo"

# Uninstall
npx --no-install husky uninstall
expect 1 "git config core.hooksPath"
