var fs = require('fs')
var path = require('path')
var expect = require('expect')
var mock = require('mock-fs')
var husky = require('../src')

function readHook(hookPath) {
  return fs.readFileSync(path.join(gitDir, hookPath), 'utf-8')
}

function exists(hookPath) {
  return fs.existsSync(path.join(gitDir, hookPath))
}

var layout = {}
var gitDir = '/project/.git'
var projectDir = '/project/node_modules/husky/src'
var subProjectDir = '/project/some/path/node_modules/husky/src'
var subModuleDir = '/project/subproject/node_modules/husky/src'

layout[gitDir] = {}
layout[path.join(gitDir, 'modules/subproject/hooks')] = {}
layout[projectDir] = {}
layout[subProjectDir] = {}
layout[path.join(subModuleDir, '../../..')] = {
  '.git': 'git: ../.git/modules/subproject'
}

describe('husky', function () {
  beforeEach(function () {
    mock(layout)
  })

  afterEach(function() {
    mock.restore()
  })

  describe('install', function () {
    it('should support basic layout', function () {
      husky.installFrom(projectDir)
      var hook = readHook('hooks/pre-commit')

      expect(hook).toInclude('# husky')
      expect(hook).toInclude('cd ../..')
      expect(hook).toInclude('npm run precommit')
    })

    it('should support project installed in sub directory', function () {
      husky.installFrom(subProjectDir)
      var hook = readHook('hooks/pre-commit')

      expect(hook).toInclude('cd ../../some/path')
    })

    it('should support git submodule', function () {
      husky.installFrom(subModuleDir)
      var hook = readHook('modules/subproject/hooks/pre-commit')

      expect(hook).toInclude('cd ../../../../subproject')
    })

    it('should not overwrite user hooks', function () {
      // Create a pre-push hook
      var hooksDir = path.join(gitDir, 'hooks')
      fs.mkdirSync(hooksDir)
      fs.writeFileSync(path.join(hooksDir, 'pre-push'), 'foo')

      // Verify that it's not overwritten
      husky.installFrom(projectDir)
      var hook = readHook('hooks/pre-push')
      expect(hook).toBe('foo')
    })
  })

  describe('uninstall', function () {
    it('should support basic layout', function () {
      husky.uninstallFrom(projectDir)
      expect(exists('hooks/pre-push')).toBeFalsy()
    })

    it('should support project installed in sub directory', function () {
      husky.uninstallFrom(subProjectDir)
      expect(exists('hooks/pre-push')).toBeFalsy()
    })

    it('should not remove user hooks', function () {
      var hooksDir = path.join(gitDir, 'hooks')
      fs.mkdirSync(hooksDir)
      fs.writeFileSync(path.join(hooksDir, 'pre-push'), 'foo')

      husky.uninstallFrom(projectDir)
      expect(exists('hooks/pre-push')).toBeTruthy()
    })
  })
})
