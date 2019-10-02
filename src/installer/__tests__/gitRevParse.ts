import path from 'path'
import slash from 'slash'
import gitRevParse from '../gitRevParse'

const root = path.join(__dirname, '../../..')

describe('gitRevParse', (): void => {
  it('should return topLevel and gitCommonDir', (): void => {
    expect(gitRevParse()).toStrictEqual({
      // Git rev-parse uses a different separator on Linux/MacOS and Windows
      // slash is used to normalized the returned value for tests
      topLevel: slash(root),
      gitCommonDir: '.git'
    })
  })
})
