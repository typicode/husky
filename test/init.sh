. "$(dirname "$0")/_functions.sh"
setup
npm link husky-init

npx --no-install husky-init
npm set-script test "echo \"pre-commit hook\" && exit 1"

# Test package.json scripts
expect 0 "grep '\"prepare\": \"husky install\"' package.json"

# Test core.hooksPath
expect_hooksPath_to_be ".husky"

# Test pre-commit
git add package.json
expect 1 "git commit -m foo"
