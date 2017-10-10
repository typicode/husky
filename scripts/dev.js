const fs = require('fs')
const path = require('path')

// Fix paths
fs.readdirSync('.git/hooks').map(filename => {
  console.log('update', filename)
  const absoluteFilename = path.join('.git/hooks', filename)
  const data = fs.readFileSync(absoluteFilename, 'utf-8')
  const updatedData = data.replace('./node_modules/husky/', './')
  fs.writeFileSync(absoluteFilename, updatedData)
})