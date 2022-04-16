. "$(dirname -- "$0")/functions.sh"
setup
install

f=".husky/pre-commit"

npx --no-install husky install

npx --no-install husky add $f "foo"
grep -m 1 _ $f && grep foo $f && ok

npx --no-install husky add .husky/pre-commit "bar"
grep -m 1 _ $f && grep foo $f && grep bar $f && ok

npx --no-install husky set .husky/pre-commit "baz"
grep -m 1 _ $f && grep foo $f || grep bar $f || grep baz $f && ok

