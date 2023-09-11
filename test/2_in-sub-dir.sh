. "$(dirname -- "$0")/functions.sh"
setup
install

# Test custom dir support
mkdir sub
npx --no-install husky -d sub/husky
echo "echo \"pre-commit\" && exit 1" >sub/husky/pre-commit

# Test core.hooksPath
expect_hooksPath_to_be "sub/husky/_"

# Test pre-commit
git add package.json
expect 1 "git commit -m foo"
