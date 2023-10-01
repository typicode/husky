#!/bin/sh
. test/functions.sh
setup
install

cat >index.mjs <<EOL
process.env.PATH = ''
import h from 'husky'
console.log(h())
EOL
expect 0 "node index.mjs"
