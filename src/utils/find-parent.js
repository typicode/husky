'use strict'

const fs = require('fs')
const path = require('path')

module.exports = function findParent(currentDir, name) {
  const dirs = currentDir.split(path.sep)

  while (dirs.pop()) {
    const dir = dirs.join(path.sep)

    if (fs.existsSync(path.join(dir, name))) {
      return path.resolve(dir)
    }
  }
}
