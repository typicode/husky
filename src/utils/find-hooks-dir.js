'use strict'

const fs = require('fs')
const path = require('path')
const findParent = require('./find-parent')

function findHooksDir(dirname) {
  const dir = findParent(dirname, '.git')

  if (dir) {
    let gitDir = path.join(dir, '.git')
    const stats = fs.lstatSync(gitDir)

    if (stats.isFile()) {
      // Expect following format
      // git: pathToGit
      gitDir = fs.readFileSync(gitDir, 'utf-8').split(':')[1].trim()

      return path.resolve(dir, gitDir, 'hooks')
    }

    return path.join(gitDir, 'hooks')
  }
}

module.exports = findHooksDir
