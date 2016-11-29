var fs = require('fs')
var path = require('path')
var expect = require('expect')
var mock = require('mock-fs')
var husky = require('../src')

function readHook(hookPath) {
  return fs.readFileSync(path.join(gitDir, hookPath), 'utf-8')
}

var layout = {}
var gitDir = '/project/.git'
var projectDir = '/project/node_modules/husky/src'
var subProjectDir = '/project/some/path/node_modules/husky/src'
var subModuleDir = '/project/subproject'

layout[gitDir] = {
  'modules/subproject': {}
}
layout[projectDir] = {}
layout[subProjectDir] = {}
layout[subModuleDir] = {
  '.git': 'git: ../.git/modules/subproject'
}

// TODO handle .git file with gitdir: ../../.git/modules/some/path

describe('husky', function () {
  beforeEach(function () {
    mock(layout)
  })

  afterEach(function() {
    mock.restore()
  })

  it('should support basic layout', function() {
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

  it('should not overwrite existing hooks', function () {
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
