import { gitRevParse } from '../gitRevParse'

describe('gitRevParse', (): void => {
  it('should return gitCommonDir and prefix', (): void => {
    expect(gitRevParse()).toStrictEqual({
      // Git rev-parse uses a different separator on Linux/MacOS and Windows
      // slash is used to normalized the returned value for tests
      gitCommonDir: '.git',
      prefix: ''
    })
  })

  it('should return gitCommonDir and prefix based on cwd', (): void => {
    expect(gitRevParse(__dirname)).toStrictEqual({
      // Git rev-parse uses a different separator on Linux/MacOS and Windows
      // slash is used to normalized the returned value for tests
      gitCommonDir: '../../../.git',
      prefix: `src/installer/__tests__/`
    })
  })
})
