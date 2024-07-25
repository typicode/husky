#!/bin/sh
# To run tests, type ./test.sh in your terminal
set -e
npm pack && mv husky-*.tgz /tmp/husky.tgz
sh test/1_default.sh
sh test/2_in-sub-dir.sh
sh test/3_from-sub-dir.sh
sh test/4_not-git-dir.sh
sh test/5_git_command_not_found.sh
sh test/6_command_not_found.sh
sh test/7_node_modules_path.sh
sh test/8_set_u.sh
sh test/9_husky_0.sh
sh test/10_init.sh
sh test/11_time.sh
sh test/12_deprecated.sh