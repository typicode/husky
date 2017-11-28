import * as cosmiconfig from 'cosmiconfig'

export default function getConf(dir: string): any {
  const { config = {} } =
    cosmiconfig('husky', {
      rcExtensions: true,
      sync: true
    }).load(dir) || {}

  const defaults = {
    skipCI: true
  }

  return { ...defaults, ...config }
}
