'use strict'

const fs = require('fs')
const path = require('path')
const findParent = require('./utils/find-parent')
const getVcs = require('./utils/get-vcs')
const findHooksDir = require('./utils/find-hooks-dir')
const getHookScript = require('./utils/get-hook-script')
const hgUpdater = require('./utils/hg-updater')
const is = require('./utils/is')

const SKIP = 'SKIP'
const UPDATE = 'UPDATE'
const MIGRATE_GHOOKS = 'MIGRATE_GHOOKS'
const MIGRATE_PRE_COMMIT = 'MIGRATE_PRE_COMMIT'
const CREATE = 'CREATE'

function write(filename, data) {
  fs.writeFileSync(filename, data)
  fs.chmodSync(filename, parseInt('0755', 8))
}

function createHook(huskyDir, vcs, hooksDir, hookName, cmd) {
  const isMercurial = vcs.name === 'hg'
  const extension = isMercurial ? '.py' : ''
  const filename = path.join(hooksDir, hookName) + extension

  // Assuming that this file is in node_modules/husky
  const packageDir = path.join(huskyDir, '..', '..')

  // Get project directory
  // When used in submodule, the project dir is the first .hg/.git that is found
  const projectDir = findParent(huskyDir, vcs.dirname)

  // In order to support projects with package.json in a different directory
  // than .hg/.git, find relative path from project directory to package.json
  const relativePath = path.join('.', path.relative(projectDir, packageDir))

  const hookScript = getHookScript(vcs, hookName, relativePath, cmd)

  // Create hooks directory if needed
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir)
  }

  if (isMercurial) {
    hgUpdater.init(huskyDir)
  }

  if (!fs.existsSync(filename)) {
    write(filename, hookScript)
    if (vcs.name === 'hg') {
      hgUpdater.addHook(huskyDir, hooksDir, hookName)
    }
    return CREATE
  }

  if (is.ghooks(filename)) {
    write(filename, hookScript)
    return MIGRATE_GHOOKS
  }

  if (is.preCommit(filename)) {
    write(filename, hookScript)
    return MIGRATE_PRE_COMMIT
  }

  if (is.husky(filename)) {
    write(filename, hookScript)
    return UPDATE
  }

  return SKIP
}

function initHgrc(huskyDir) {
  const rootDir = findParent(huskyDir, '.hg')
  const vcsDir = path.join(rootDir, '.hg')
  const hgrcFile = path.join(vcsDir, 'hgrc')
  if (!fs.existsSync(hgrcFile)) {
    try {
      fs.writeFileSync(hgrcFile, '[hooks]')
    } catch (e) {
      console.error(e)
    }
  } else {
    try {
      const hgrcData = fs.readFileSync(hgrcFile, 'utf8')
      if (hgrcData.indexOf('[hooks]') === -1) {
        fs.appendFileSync(hgrcFile, '\n[hooks]')
      }
    } catch (e) {
      console.error(e)
    }
  }
}

function installFrom(huskyDir) {
  try {
    const isInSubNodeModule = (huskyDir.match(/node_modules/g) || []).length > 1
    if (isInSubNodeModule) {
      return console.log(
        'trying to install from sub "node_module" directory,',
        'skipping hooks installation'
      )
    }

    const vcs = getVcs(huskyDir)
    const hooksDir = findHooksDir(vcs)

    if (hooksDir) {
      vcs.hooks
        .map(function(hookName) {
          const npmScriptName = hookName.replace(/-/g, '')
          return {
            hookName: hookName,
            action: createHook(huskyDir, vcs, hooksDir, hookName, npmScriptName)
          }
        })
        .forEach(function(item) {
          switch (item.action) {
            case MIGRATE_GHOOKS:
              console.log(`migrating existing ghooks ${item.hookName} script`)
              break
            case MIGRATE_PRE_COMMIT:
              console.log(
                `migrating existing pre-commit ${item.hookName} script`
              )
              break
            case UPDATE:
              break
            case SKIP:
              console.log(`skipping ${item.hookName} hook (existing user hook)`)
              break
            case CREATE:
              break
            default:
              console.error('Unknown action')
          }
        })
      console.log('done\n')
    } else {
      console.log("can't find .git directory, skipping Git hooks installation")
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = installFrom
