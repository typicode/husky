# Exit on error
set -e

# Enable DEBUG
HUSKY_DEBUG=1

# Test directory and files
projectDir=/tmp/husky-project
filename=index.js
hookParams=hook-params

# sep function
sep() {
  echo
  echo '------'
  echo
}

# Reset dir
rm -rf $projectDir && mkdir $projectDir

# Copy test config
cp scripts/.huskyrc $projectDir

# Husky needs to be packed to be closer to a real install
npm run build && npm pack

# Move husky to project
mv husky-*.tgz $projectDir

# Init a blank git/npm project and install husky
cd $projectDir
git init
npm init -y
npm install husky-*.tgz

sep

# Show post-checkout hook content
# cat .git/hooks/post-checkout

# Run git checkout with HUSKY_SKIP_HOOKS=1
touch $filename
git add $filename
(export HUSKY_SKIP_HOOKS=1; time git commit -m "first")

# Verify that post-checkout hook didn't run
if [ -f $hookParams ]; then
  echo ".git/hooks/post-checkout script has run, hooks were not skipped."
  exit 1
fi

sep

# Retry
echo foo
touch second && git add second && git commit -m second
echo bar

# Verify that hook did run
if [ ! -f $hookParams ]; then
  echo "hook script didn't run"
  exit 1
fi

# test that HUSKY_GIT_PARAMS worked TODO

sep

# Should not fail due to missing script
mv node_modules _node_modules
time git commit --amend -m "third"

