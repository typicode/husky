set -e
npm run bootstrap
npm run build
(cd packages/husky && npm pack && mv husky-*.tgz /tmp/husky.tgz)
(cd packages/init && npm link)
sh test/config-dir.sh
sh test/default.sh
sh test/init.sh
sh test/not-git-dir.sh
sh test/set-add.sh
sh test/sub-dir.sh
