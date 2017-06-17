const fs = require('fs')
const path = require('path')

module.exports = function findParent (currentDir, name) {
  const dirs = currentDir.split('/')
  console.log({ dirs })
  while (dirs.pop()) {
    const dir = dirs.join('/')
    console.log({ dir })

    if (fs.existsSync(`${dir}/${name}`)) {
      console.log('Found', `${dir}/${name}`, dir)
      return path.resolve(`${dir}/`)
    }
  }
}
