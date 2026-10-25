#!/bin/sh
. test/functions.sh
setup
install

# Test init command without a package.json
rm package.json
expect 1 "npx --no-install husky init"
if npx --no-install husky init 2>&1 | grep -q "ENOENT"; then
	error "husky init should print a clear message, not a stack trace"
fi
if [ -e package.json ]; then
	error "husky init should not create package.json"
fi
