#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky

git add package.json
cat > .husky/pre-commit <<'EOL'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
EOL

expect 0 "git commit -m foo"