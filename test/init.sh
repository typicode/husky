. "$(dirname "$0")/_functions.sh"
setup

cat > package.json << EOL
{
	"scripts": {
		"test": "echo \"pre-commit hook\" && exit 1"
	}
}
EOL

npm link husky-init
npx --no-install husky-init

# Test package.json scripts
# husky-init should create prepare script
expect 0 "grep '\"prepare\": \"husky install\"' package.json"

# Test core.hooksPath
# husky-init should install husky
expect_hooksPath_to_be ".husky"

# Test pre-commit
git add package.json
expect 1 "git commit -m foo"
