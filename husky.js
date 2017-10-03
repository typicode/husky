const fs = require('fs')

// Prevent error when cloning husky project
if (fs.existsSync('./lib/install/index.js')) {
  // Can be "install" or "uninstall"
  const action = process.argv[2]

  // Run installer
  require('./lib/install')[action](__dirname)
} else {
  console.error("Error can't find lib directory, run `npm run build`")  
}
