#!/bin/sh
. test/functions.sh
setup

# Skip test for npm 6
npm --version | grep "^6\." && exit 0

# Example:
# .git
# sub/package.json

# Edit package.json in sub directory
mkdir sub
cd sub
npm install ../../husky.tgz
cat >package.json <<EOL
{
	"scripts": {
		"prepare": "cd .. && husky sub/.husky"
	}
}
EOL

# Install
npm run prepare

# Add hook
echo "echo \"pre-commit hook\" && exit 1" >.husky/pre-commit

# Test core.hooksPath
expect_hooksPath_to_be "sub/.husky/_"

# Test pre-commit
git add package.json
expect 1 "git commit -m foo"
