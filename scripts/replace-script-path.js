/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

module.exports = function(newPath) {
  const regExp = /scriptPath="(.*)"/

  fs.readdirSync('.git/hooks')
    .filter(filename => path.extname(filename) !== '.sample')
    .forEach(filename => {
      console.log('devinstall: update', filename)
      const absoluteFilename = path.join('.git/hooks', filename)
      const data = fs.readFileSync(absoluteFilename, 'utf-8')

      if (!regExp.test(data)) {
        throw new Error("Can't find scriptPath")
      }

      const updatedData = data.replace(regExp, `scriptPath="${newPath}"`)

      fs.writeFileSync(absoluteFilename, updatedData)
    })
}
