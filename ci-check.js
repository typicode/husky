const fs = require('fs')

if (fs.existsSync('pre-commit.ok')) {
  fs.unlinkSync('pre-commit.ok')
  console.log('.git/hooks/pre-commit script has run successfully on CI')
} else {
  console.log('.git/hooks/pre-commit script has failed running on CI')
  process.exit(1)
}