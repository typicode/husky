#!/bin/sh
. test/functions.sh
setup
install

# A reader that quits early (| head, grep -q) closes the pipe: no EPIPE crash
# HUSKY=0 makes husky print a message, so it writes to the closed pipe
expect 0 "HUSKY=0 node_modules/.bin/husky 2>err | true; [ ! -s err ] || { cat err; exit 1; }"
# init goes on writing files after printing, so it must not exit early either
expect 0 "HUSKY=0 node_modules/.bin/husky init 2>err | true; [ ! -s err ] && [ -f .husky/pre-commit ] || { cat err; exit 1; }"

ok
