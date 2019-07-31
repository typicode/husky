# Exit on error
set -e

# Enable DEBUG
HUSKY_DEBUG=1

# Test directory and files
projectDir=/tmp/husky-project
hookParamsFile=hook-params

# Separator function for readability
sep() {
  echo
  echo '------'
  echo
}

# Commit function
commit() {
  touch $1
  git add $1
  (export HUSKY_SKIP_HOOKS=$2; time git commit -m "$1 msg")
}

# Reset dir
rm -rf $projectDir && mkdir $projectDir

# Husky needs to be packed to be closer to a real install
npm run build && npm pack

# Move husky to project
mv husky-*.tgz $projectDir

# Init a blank git/npm project and install husky
cd $projectDir
git init
npm init -y
npm install husky-*.tgz

cat > .huskyrc << EOL
{
  "hooks": {
    "commit-msg": "echo \"commit-msg hook from Husky\" && echo \$HUSKY_GIT_PARAMS > $hookParamsFile"
  }
}
EOL

sep

# Show post-checkout hook content
# cat .git/hooks/post-checkout

# Run git checkout with HUSKY_SKIP_HOOKS=1
commit first 1

# Verify that post-checkout hook didn't run
if [ -f $hookParamsFile ]; then
  echo "hook script has run, hooks were not skipped."
  exit 1
fi

sep

# Retry
commit second

# Verify that hook did run
if [ ! -f $hookParamsFile ]; then
  echo "hook script didn't run"
  exit 1
fi

# test that HUSKY_GIT_PARAMS worked
actual=$(cat $hookParamsFile)
expected=".git/COMMIT_EDITMSG"
if [ "$actual" != "$expected" ]; then
  echo "HUSKY_GIT_PARAMS weren't set correctly"
  echo "$actual != $expected"
  exit 1
fi

sep

# Should not fail due to missing script
mv node_modules _node_modules
commit third
