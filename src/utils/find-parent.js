'use strict'

const fs = require('fs')
const path = require('path')

module.exports = function findParent(currentDir, name) {
  const dirs = currentDir.split('/')

  while (dirs.pop()) {
    const dir = dirs.join('/')

    if (fs.existsSync(`${dir}/${name}`)) {
      return path.resolve(`${dir}/`)
    }
  }
}
