var fs = require('fs')
var path = require('path')
var expect = require('expect')
var mock = require('mock-fs')
var husky = require('../src')

var gitDir = '/project/.git'

function readHook(hookPath) {
  return fs.readFileSync(path.join(gitDir, hookPath), 'utf-8')
}

function exists(hookPath) {
  return fs.existsSync(path.join(gitDir, hookPath))
}

describe('husky', function () {
  beforeEach(function () {
    mock({
      '/project/.git/hooks': {}
    })
  })

  afterEach(function() {
    mock.restore()
  })

  it('should support basic layout', function () {
    mock({
      '/project/node_modules/husky': {}
    })
    
    husky.installFrom('/project/node_modules/husky')
    var hook = readHook('hooks/pre-commit')

    expect(hook).toInclude('# husky')
    expect(hook).toInclude('cd .')
    expect(hook).toInclude('npm run precommit')

    husky.uninstallFrom('/project/node_modules/husky')
    expect(exists('hooks/pre-push')).toBeFalsy()
  })

  it('should support project installed in sub directory', function () {
    mock({
      '/project/A/B/node_modules/husky': {}
    })

    husky.installFrom('/project/A/B/node_modules/husky')
    var hook = readHook('hooks/pre-commit')

    expect(hook).toInclude('cd A/B')

    husky.uninstallFrom('/project/A/B/node_modules/husky')
    expect(exists('hooks/pre-push')).toBeFalsy()
  })

  it('should support git submodule', function () {
    mock({
      '/project/A/B/node_modules/husky': {},
      '/project/A/B/.git': 'git: ../../.git/modules/A/B'
    })

    husky.installFrom('/project/A/B/node_modules/husky')
    var hook = readHook('modules/A/B/hooks/pre-commit')

    expect(hook).toInclude('cd .')

    husky.uninstallFrom('/project/A/B/node_modules/husky')
    expect(exists('hooks/pre-push')).toBeFalsy()
  })

  it('should support git submodule and sub directory', function () {
    mock({
      '/project/A/B/app/node_modules/husky': {},
      '/project/A/B/.git': 'git: ../../.git/modules/A/B'
    })

    husky.installFrom('/project/A/B/app/node_modules/husky')
    var hook = readHook('modules/A/B/hooks/pre-commit')

    expect(hook).toInclude('cd app')

    husky.uninstallFrom('/project/A/B/app/node_modules/husky')
    expect(exists('hooks/pre-push')).toBeFalsy()
  })


  it('should not modify user hooks', function () {
    mock({
      '/project/node_modules/husky': {},
      '/project/.git/hooks/pre-push': 'foo'
    })

    // Verify that it's not overwritten
    husky.installFrom('/project/node_modules/husky')
    var hook = readHook('hooks/pre-push')
    expect(hook).toBe('foo')

    husky.uninstallFrom('/project/node_modules/husky')
    expect(exists('hooks/pre-push')).toBeTruthy()
  })
})
