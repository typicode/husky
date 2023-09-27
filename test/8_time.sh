. "$(dirname -- "$0")/functions.sh"
setup
install

npx --no-install husky install

git add package.json
npx --no-install husky add .husky/pre-commit "echo pre-commit"
time git commit -m foo
