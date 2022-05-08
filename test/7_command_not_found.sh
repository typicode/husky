. "$(dirname -- "$0")/functions.sh"
setup
install

npx --no-install husky install

# Test core.hooksPath
expect_hooksPath_to_be ".husky"

# Test pre-commit with 127 exit code
git add package.json
npx --no-install husky add .husky/pre-commit "exit 127"
expect 1 "git commit -m foo"
