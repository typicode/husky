#!/bin/sh
. test/functions.sh
setup
install

npx --no-install husky

cat > .husky/pre-commit <<'EOL'
# foo
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
# bar
EOL

cat > expected <<'EOL'
# foo
# bar
EOL

npx --no-install husky
expect 0 "diff .husky/pre-commit expected"