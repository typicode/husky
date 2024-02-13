#!/bin/sh
. test/functions.sh
setup
install

# Test init command
expect 0 "npx --no-install husky init"
