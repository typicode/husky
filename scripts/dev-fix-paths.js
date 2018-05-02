const fs = require('fs')
const path = require('path')

// Fix paths
fs.readdirSync('.git/hooks').map(filename => {
  console.log('devinstall: update', filename)
  const absoluteFilename = path.join('.git/hooks', filename)
  const data = fs.readFileSync(absoluteFilename, 'utf-8')
  
  // Replace runner with dev-runner in local hooks
  const updatedData = data.replace('node_modules/husky/lib/runner/bin', 'scripts/dev-runner')
  fs.writeFileSync(absoluteFilename, updatedData)
})
