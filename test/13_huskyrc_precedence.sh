#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky

mkdir home
echo "legacy" > home/.huskyrc
echo "true" > .husky/pre-commit

HOME="$(pwd)/home" XDG_CONFIG_HOME= git commit --allow-empty -m warn >out 2>err
grep -q "husky - '~/.huskyrc' is DEPRECATED" err

mkdir -p home/.config/husky
echo "export HUSKY_INIT_LOADED=1" > home/.config/husky/init.sh
rm home/.huskyrc
ln -s .config/husky/init.sh home/.huskyrc
echo 'test "$HUSKY_INIT_LOADED" = "1"' > .husky/pre-commit

HOME="$(pwd)/home" XDG_CONFIG_HOME= git commit --allow-empty -m no-warn >out 2>err
if grep -q "DEPRECATED" err; then
	cat err
	error "deprecated ~/.huskyrc warning should not be shown when init.sh exists"
fi
