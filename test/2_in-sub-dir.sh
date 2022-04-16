. "$(dirname -- "$0")/functions.sh"
setup
install

# Test custom dir support
mkdir sub
npx --no-install husky install sub/husky
npx --no-install husky add sub/husky/pre-commit "echo \"pre-commit\" && exit 1"

# Test core.hooksPath
expect_hooksPath_to_be "sub/husky"

# Test pre-commit
git add package.json
expect 1 "git commit -m foo"
