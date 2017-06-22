'use strict'

const fs = require('fs')
const hooks = require('./hooks.json')
const findHooksDir = require('./utils/find-hooks-dir')
const isHusky = require('./utils/is-husky')

function removeHook(dir, name) {
  const filename = `${dir}/${name}`

  if (fs.existsSync(filename) && isHusky(filename)) {
    fs.unlinkSync(`${dir}/${name}`)
  }
}

function uninstallFrom(huskyDir) {
  try {
    const hooksDir = findHooksDir(huskyDir)

    hooks.forEach(function(hookName) {
      removeHook(hooksDir, hookName)
    })
    console.log('done\n')
  } catch (e) {
    console.error(e)
  }
}

module.exports = uninstallFrom
