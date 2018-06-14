const fs = require('fs')
const path = require('path')

const filename = path.join(__dirname, '../ci.ok')

if (fs.existsSync(filename)) {
  fs.unlinkSync(filename)
  console.log('.git/hooks/post-checkout script has run successfully on CI')
} else {
  console.log('.git/hooks/post-checkout script has failed running on CI')
  process.exit(1)
}
