import path from 'path'
import gitRevParse from '../gitRevParse'

describe('gitRevParse', (): void => {
  it('should return topLevel and gitDir', (): void => {
    expect(gitRevParse()).toStrictEqual({
      topLevel: path.join(__dirname, '../../..'),
      gitDir: '.git'
    })
  })
})
