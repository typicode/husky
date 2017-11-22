'use strict'

const fs = require('fs')
const getVcs = require("./utils/get-vcs");
const findHooksDir = require('./utils/find-hooks-dir')
const is = require('./utils/is')

function removeHook(dir, name) {
  const filename = `${dir}/${name}`

  if (fs.existsSync(filename) && is.husky(filename)) {
    fs.unlinkSync(`${dir}/${name}`)
  }
}

function uninstallFrom(huskyDir) {
  try {

    const vcs = getVcs(huskyDir);
    const hooksDir = findHooksDir(vcs);

    vcs.hooks.forEach(function(hookName) {
      removeHook(hooksDir, hookName)
    })
    console.log('done\n')
  } catch (e) {
    console.error(e)
  }
}

module.exports = uninstallFrom
