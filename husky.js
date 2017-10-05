const fs = require('fs')
const execa = require('execa')

// Prevent error when cloning husky project
if (fs.existsSync('./lib/install/index.js')) {
  // Can be "install" or "uninstall"
  const action = process.argv[2]

  // Find Git dir
  const { status, stdout, stderr } = execa.sync('git', ['rev-parse --git-dir'])
  const gitDir = stdout
  
  if (status !== 0) {
    console.log(stderr)
    process.exit(1)
  }

  // Run installer
  require('./lib/install')[action](__dirname, gitDir)
} else {
  console.error("Error can't find lib directory, run `npm run build`")  
}
