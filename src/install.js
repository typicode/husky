'use strict'

const fs = require('fs')
const path = require('path')
const findParent = require('./utils/find-parent')
const findHooksDir = require('./utils/find-hooks-dir')
const getHookScript = require('./utils/get-hook-script')
const is = require('./utils/is')
const hooks = require('./hooks.json')

const SKIP = 'SKIP'
const UPDATE = 'UPDATE'
const MIGRATE_GHOOKS = 'MIGRATE_GHOOKS'
const MIGRATE_PRE_COMMIT = 'MIGRATE_PRE_COMMIT'
const CREATE = 'CREATE'

function write(filename, data) {
  fs.writeFileSync(filename, data)
  fs.chmodSync(filename, parseInt('0755', 8))
}

function createHook(huskyDir, hooksDir, hookName, cmd) {
  const filename = path.join(hooksDir, hookName)

  // Assuming that this file is in node_modules/husky
  const packageDir = path.join(huskyDir, '..', '..')

  // Get project directory
  // When used in submodule, the project dir is the first .git that is found
  const projectDir = findParent(huskyDir, '.git')

  const config = {
    scope: null
  }

  const configPath = path.resolve(packageDir, '.huskyrc')
  if (fs.existsSync(configPath)) {
    // Check `.huskyrc` json file for husky options.
    try {
      Object.assign(config, JSON.parse(fs.readFileSync(configPath)))
    } catch (error) {
      error.message =
        '[husky] Unable to create git hook. Config file `.huskyrc` is invalid json: ' +
        error.message
      throw error
    }
  } else {
    // Check package.json for husky options.
    const pkgPath = path.resolve(packageDir, 'package.json')
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
      if (typeof pkg.husky === 'object' && pkg.husky !== null) {
        Object.assign(config, pkg.husky)
      }
    }
  }

  // In order to support projects with package.json in a different directory
  // than .git, find relative path from project directory to package.json
  const relativePath = path.join('.', path.relative(projectDir, packageDir))

  // Check husky scope.
  if (config.scope === null) {
    config.scope = ''
  } else {
    console.assert(
      typeof config.scope === 'string',
      '[husky] Expected scope to be a string: ' + config.scope
    )
    // Find relative path from package.json directory to scope path.
    config.scope = path.relative(
      projectDir,
      path.join(packageDir, config.scope)
    )
    console.assert(
      config.scope.indexOf('..') !== 0,
      '[husky] Scope path is outside of project root directory: ' + config.scope
    )
    console.assert(
      fs.existsSync(config.scope),
      '[husky] Scope path is not exists: ' + config.scope
    )

    if (config.scope === projectDir) {
      config.scope = ''
    }
  }

  const hookScript = getHookScript(hookName, relativePath, cmd, config)

  // Create hooks directory if needed
  if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir)

  if (!fs.existsSync(filename)) {
    write(filename, hookScript)
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

function installFrom(huskyDir) {
  try {
    const isInSubNodeModule = (huskyDir.match(/node_modules/g) || []).length > 1
    if (isInSubNodeModule) {
      return console.log(
        "trying to install from sub 'node_module' directory,",
        'skipping Git hooks installation'
      )
    }

    const hooksDir = findHooksDir(huskyDir)

    if (hooksDir) {
      hooks
        .map(function(hookName) {
          const npmScriptName = hookName.replace(/-/g, '')
          return {
            hookName: hookName,
            action: createHook(huskyDir, hooksDir, hookName, npmScriptName)
          }
        })
        .forEach(function(item) {
          switch (item.action) {
            case MIGRATE_GHOOKS:
              console.log(`migrating existing ghooks ${item.hookName} script`)
              break
            case MIGRATE_PRE_COMMIT:
              console.log(`migrating existing pre-commit ${item.hookName} script`)
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
