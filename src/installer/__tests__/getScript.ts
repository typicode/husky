import './__env__'
import getScript from '../getScript'

const rootDir = '/home/typicode/project'
const huskyDir = '/home/typicode/project/node_modules/husky'

describe('hookScript', (): void => {
  it('should match snapshot (OS X/Linux)', (): void => {
    const script = getScript(rootDir, huskyDir)
    expect(script).toMatchSnapshot()
    expect(script).toMatch('run-node')
  })

  it('should match snapshot (Windows)', (): void => {
    const script = getScript(rootDir, huskyDir)
    expect(script).toMatchSnapshot()
    expect(script).not.toMatch('run-node')
  })
})
