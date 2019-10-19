# Integrations test
# Installs husky in /tmp and makes a few commits

# Exit on error
set -e

# ---
# Variables
# ---

HUSKY_DEBUG=1

projectDir=/tmp/husky-project
hookParamsFile=hook-params


# ---
# Functions
# ---

# Separator function for readability
test() {
  echo -e "\e[34m\n---\n$1\n---\n\e[0m"
}

# Commit function
commit() {
  touch $1
  git add $1
  HUSKY_SKIP_HOOKS=$2 git commit -m "$1 msg"
}

# ---
# Setup
# ---

# Reset dir
rm -rf $projectDir && mkdir $projectDir

# Husky needs to be packed to be closer to a real install
# Ensure that install scripts are enabled for the test
npx --no-install pinst --enable
npm run build && npm pack
npx --no-install pinst --disable

# Move husky to project
mv husky-*.tgz $projectDir

# Init a blank git/npm project and install husky
cd $projectDir
git init
git config user.name foo # Needed by AppVeyor
git config user.email foo@example.com # Needed by AppVeyor
npm init -y


# Create .huskyrc with skipCI: false before installing husky
cat > .huskyrc << EOL
{
  "skipCI": false,
  "hooks": {
    "commit-msg": "echo \"commit-msg hook from Husky\" && echo \$HUSKY_GIT_PARAMS > $hookParamsFile"
  }
}
EOL
HUSKY_DEBUG=1 npm install husky-*.tgz

# Show hook content
cat .git/hooks/commit-msg

# ---
# Tests
# ---

test "hook should not run when HUSKY_SKIP_HOOKS=1"

commit first 1

if [ -f $hookParamsFile ]; then
  echo "Fail: hooks were not skipped."
  exit 1
fi

# ---
test "hook should run and have HUSKY_GIT_PARAMS set"

commit second

if [ ! -f $hookParamsFile ]; then
  echo "Fail: hook script didn't run"
  exit 1
fi

actual=$(cat $hookParamsFile)
expected=".git/COMMIT_EDITMSG"

if [ "$actual" != "$expected" ]; then
  echo "Fail: HUSKY_GIT_PARAMS weren't set correctly"
  echo "$actual != $expected"
  exit 1
fi

# ---
test "hook should not fail if husky is not found"

mv node_modules _node_modules
commit third
