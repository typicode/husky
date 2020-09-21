. $(dirname $0)/_functions.sh

title "subdir"

rootDir="/tmp/pre-commit-sub"
subDir="$rootDir/sub"

rm -rf $rootDir
install_tgz $subDir

# Init git in rootDir
cd $rootDir
init_git

# Edit package.json in sub directory
cd $subDir
cat > package.json << EOL
{
	"scripts": {
		"postinstall": "cd .. && husky install sub"
	}
}
EOL

# Install
npm run postinstall

# Add hook
npx --no-install husky add pre-commit "echo \"msg from pre-commit hook\" && exit 1"

# Debug
# cat .husky/*

# Test core.hooksPath
test_hooksPath "sub/.husky"

# Test pre-commit
git add package.json
git commit -m "should fail" || echo -e "\e[0;32mSUCCESS\e[m" && exit 0
