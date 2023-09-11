. "$(dirname -- "$0")/functions.sh"
setup
install

npx --no-install husky

# Test core.hooksPath
expect_hooksPath_to_be ".husky/_"

# Test pre-commit
git add package.json
echo "echo \"pre-commit\" && exit 1" >.husky/pre-commit
expect 1 "git commit -m foo"
