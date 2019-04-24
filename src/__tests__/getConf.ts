import fs from 'fs'
import path from 'path'
import tempy from 'tempy'
import getConf from '../getConf'

const testConf = { husky: { foo: 'bar' } }

describe('getConf', () => {
  it('should return default conf', () => {
    const tempDir = tempy.directory()
    fs.writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify(testConf)
    )

    expect(getConf(tempDir)).toEqual({ skipCI: true, foo: 'bar' })
  })

  it('should allow overriding default conf', () => {
    const tempDir = tempy.directory()
    fs.writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify(testConf)
    )

    expect(getConf(tempDir)).toEqual({ skipCI: true, foo: 'bar' })
  })

  it('should support .huskyrc', () => {
    const tempDir = tempy.directory()
    fs.writeFileSync(
      path.join(tempDir, '.huskyrc'),
      JSON.stringify(testConf.husky)
    )

    expect(getConf(tempDir)).toEqual({ skipCI: true, foo: 'bar' })
  })
})
