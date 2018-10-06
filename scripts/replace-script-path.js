const fs = require('fs')
const path = require('path')

module.exports = function replaceScriptPath(newPath, newAppendPath) {
  const regExp = /scriptPath="(.*)"/
  const appendRegExp = /appendScriptPath="(.*)"/

  fs.readdirSync('.git/hooks')
    .filter(
      filename => !['.sample', '.husky-user'].includes(path.extname(filename))
    )
    .map(filename => {
      console.log('devinstall: update', filename)
      const absoluteFilename = path.join('.git/hooks', filename)
      const data = fs.readFileSync(absoluteFilename, 'utf-8')

      if (!regExp.test(data)) {
        throw new Error("Can't find scriptPath")
      }

      const updatedData = data
        .replace(regExp, `scriptPath="${newPath}"`)
        .replace(appendRegExp, `appendScriptPath="${newAppendPath}"`)

      fs.writeFileSync(absoluteFilename, updatedData)
    })
}
