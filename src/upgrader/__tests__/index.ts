import * as fs from 'fs'
import * as path from 'path'
import * as tempy from 'tempy'
import index from '../'

const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../../package.json'), 'utf-8')
)

const createTmpDir = () => {
  const dir = tempy.directory()
  const filename = path.join(dir, 'package.json')
  const huskyModule = path.join(dir, 'node_modules/husky')
  const huskyModulePackageJson = path.join(huskyModule, 'package.json')

  fs.writeFileSync(
    filename,
    JSON.stringify({
      scripts: {
        commitmsg: 'echo $GIT_PARAMS GIT_PARAMS HUSKY_GIT_PARAMS',
        precommit: 'npm test'
      }
    }),
    'utf-8'
  )

  return {
    dir,
    filename,
    huskyModule,
    huskyModulePackageJson
  }
}

describe('upgrade', () => {
  it('should throw if husky is not installed', () => {
    const { dir } = createTmpDir()

    expect(() => index(dir)).toThrow(
      'husky is not currently installed in this repository.'
    )
  })

  it('should throw if husky version does not match', () => {
    const fakeVersion = '0.0.0'
    expect(fakeVersion).not.toEqual(packageJson.version)

    const { dir, huskyModule, huskyModulePackageJson } = createTmpDir()

    fs.mkdirSync(huskyModule, { recursive: true })

    fs.writeFileSync(
      huskyModulePackageJson,
      JSON.stringify({
        ...packageJson,
        version: fakeVersion
      }),
      'utf-8'
    )

    expect(() => index(dir)).toThrow()
  })

  it('should run working command and return 0 status', () => {
    const {
      dir,
      filename,
      huskyModule,
      huskyModulePackageJson
    } = createTmpDir()

    fs.mkdirSync(huskyModule, { recursive: true })

    fs.writeFileSync(
      huskyModulePackageJson,
      JSON.stringify(packageJson),
      'utf-8'
    )

    index(dir)

    expect(JSON.parse(fs.readFileSync(filename, 'utf-8'))).toEqual({
      husky: {
        hooks: {
          'commit-msg':
            'echo $HUSKY_GIT_PARAMS HUSKY_GIT_PARAMS HUSKY_GIT_PARAMS',
          'pre-commit': 'npm test'
        }
      },
      scripts: {}
    })
  })
})
