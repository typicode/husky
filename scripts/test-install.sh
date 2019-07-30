# Exit on error
set -e

projectPath=/tmp/husky-project

# Reset dir
rm -rf $projectPath && mkdir $projectPath

# Copy test config
cp scripts/.huskyrc $projectPath

# Husky needs to be packed to be closer to a real install
npm run build && npm pack

# Move husky to project
mv husky-*.tgz $projectPath

# Init a blank git/npm project and install husky
cd $projectPath
git init
npm init -y
npm install husky-*.tgz

# Show post-checkout hook content
cat .git/hooks/post-checkout

# Test HUSKY_SKIP_HOOKS
(export HUSKY_SKIP_HOOKS=1; time git checkout -b master)
if [ -f ci-post-checkout ]; then
  echo ".git/hooks/post-checkout script has run, hooks were not skipped."
  exit 1
fi

# Should not fail due to missing script
rm -rf node_modules
time git checkout -b master

