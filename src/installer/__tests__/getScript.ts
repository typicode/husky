import * as path from 'path'
import getScript from '../getScript'

const userDir = path.join(__dirname, '../../..')

// On OS X/Linux runNodePath gets resolved to the following value
// In order to make the test deterministic on AppVeyor, the value is hardcoded
const runNodePath = 'node_modules/run-node/run-node'

describe('hookScript', () => {
  it('should match snapshot (OS X/Linux)', () => {
    const script = getScript(userDir, runNodePath, 'darwin')
    expect(script).toMatchSnapshot()
    expect(script).toMatch('run-node')
  })

  it('should match snapshot (Windows)', () => {
    const script = getScript(userDir, runNodePath, 'win32')

    expect(script).toMatchSnapshot()
    expect(script).not.toMatch('run-node')
  })
})
