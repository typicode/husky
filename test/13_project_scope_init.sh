#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky

git add package.json
cat >.husky/init.sh <<'EOL'
#!/usr/bin/env sh
exit 1
EOL

expect 1 "git commit -m foo"
