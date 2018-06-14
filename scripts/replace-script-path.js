const fs = require('fs')
const path = require('path')

module.exports = function replaceScriptPath(newPath) {
  const regExp = /scriptPath="(.*)"/
  
  fs.readdirSync('.git/hooks').map(filename => {
    console.log('devinstall: update', filename)
    const absoluteFilename = path.join('.git/hooks', filename)
    const data = fs.readFileSync(absoluteFilename, 'utf-8')
  
    if (!data.test(regExp)) {
      throw new Error("Can't find scriptPath")
    }

    const updatedData = data.replace(regExp, `scriptPath="${newPath}"`)
  
    fs.writeFileSync(absoluteFilename, updatedData)
  })
}


