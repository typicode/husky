import * as cosmiconfig from 'cosmiconfig'

interface IHook {
  skipCI: boolean
}

export default function getConf(dir: string): IHook {
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
