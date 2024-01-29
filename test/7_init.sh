#!/bin/sh
. test/functions.sh
setup
install

expect 0 "npx --no-install husky init"
