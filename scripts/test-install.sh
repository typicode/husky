testPath=/tmp/husky-test

rm -rf $testPath && mkdir $testPath
cp scripts/.huskyrc $testPath
npm run build && npm pack && mv husky-*.tgz $testPath

cd $testPath

git init
npm init -y
npm install husky-*.tgz

