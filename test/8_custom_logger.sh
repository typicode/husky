. "$(dirname "$0")/functions.sh"
setup
install

npx --no-install husky install

# Test core.hooksPath
expect_hooksPath_to_be ".husky"

# Test pre-commit
git add package.json
echo '
const { configure } = require("husky");
const { install, set, add } = configure({
log: (msg) => console.log(`HUSKY LOG - ${msg}`),
});
install();
set(".husky/pre-commit", "");
add(".husky/pre-commit", "echo \"pre-commit\" && exit 1");
' > custom_logger.js
node custom_logger.js | grep -q "HUSKY LOG" || (
  echo "Custom logger was not taken into account"
  exit 1
)
expect 1 "git commit -m foo"

# Uninstall
npx --no-install husky uninstall
expect 1 "git config core.hooksPath"
