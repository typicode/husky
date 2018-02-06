const fs = require('fs')

if (fs.existsSync('ci.ok')) {
  fs.unlinkSync('ci.ok')
  console.log('.git/hooks/post-checkout script has run successfully on CI')
} else {
  console.log('.git/hooks/post-checkout script has failed running on CI')
  process.exit(1)
}