const fs = require('fs')
const path = require('path')
const execa = require('execa')

// Prevent error when cloning husky project
if (fs.existsSync('./lib/install/index.js')) {
  // Action can be "install" or "uninstall"
  const action = process.argv[2]

  // Find Git dir
  const { status, stdout, stderr } = execa.sync('git', ['rev-parse', '--absolute-git-dir'])
  const gitDir = path.resolve(stdout) // Needed to normalize path on Windows
  
  if (status !== 0) {
    console.log(stderr)
    process.exit(1)
  }

  // Run installer
  require('./lib/install')[action](gitDir, __dirname)
} else {
  console.error("Error can't find lib directory, run `npm run build`")  
}