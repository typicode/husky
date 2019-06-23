import path from 'path'
import slash from 'slash'
import gitRevParse from '../gitRevParse'

describe('gitRevParse', (): void => {
  it('should return topLevel and gitDir', (): void => {
    expect(gitRevParse()).toStrictEqual({
      // Normalize
      topLevel: slash(path.join(__dirname, '../../..')),
      gitDir: '.git'
    })
  })
})
