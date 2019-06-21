/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const filename = path.join(__dirname, '../ci-post-checkout')

if (fs.existsSync(filename)) {
  fs.unlinkSync(filename)
  console.log(
    '.git/hooks/post-checkout script has run, hooks were not skipped.'
  )
  process.exit(1)
} else {
  console.log(
    '.git/hooks/post-checkout script has not run, hooks were successfully skipped.'
  )
}
