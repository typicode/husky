/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const filename = path.join(__dirname, '../ci-post-checkout')

fs.writeFileSync(filename, process.env.HUSKY_GIT_PARAMS)
