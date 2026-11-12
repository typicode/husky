#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky

# init.sh should still run when the hook has no local script (issue #1632)
mkdir -p config/husky
printf 'touch "%s/init-ran"\n' "$(pwd)" > config/husky/init.sh

XDG_CONFIG_HOME="$(pwd)/config" expect 0 ".husky/_/pre-push"

if [ ! -f init-ran ]; then
	error "init.sh should run even when the local hook file is missing"
fi

ok
