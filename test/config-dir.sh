. "$(dirname "$0")/_functions.sh"
setup
install

# Test custom dir support
mkdir .config
npx --no-install husky install .config/husky
npx --no-install husky add .config/husky/pre-commit "echo \"pre-commit\" && exit 1"

# Test core.hooksPath
expect_hooksPath_to_be ".config/husky"

# Test pre-commit
git add package.json
expect 1 "git commit -m foo"
