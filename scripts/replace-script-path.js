const fs = require('fs')
const path = require('path')

module.exports = function replaceScriptPath(newPath) {
  const regExp = /scriptPath="(.*)"/
  
  fs.readdirSync('.git/hooks')
    .filter(filename => ['.sample', '.husky-user'].indexOf(path.extname(filename)) < 0 )
    .map(filename => {
      console.log('devinstall: update', filename)
      const absoluteFilename = path.join('.git/hooks', filename)
      const data = fs.readFileSync(absoluteFilename, 'utf-8')
  
      if (!regExp.test(data)) {
        throw new Error("Can't find scriptPath in " + filename)
      }

      const updatedData = data.replace(regExp, `scriptPath="${newPath}"`)
  
      fs.writeFileSync(absoluteFilename, updatedData)
    })
}
