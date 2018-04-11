import * as cosmiconfig from 'cosmiconfig'

interface IConf {
  skipCI: boolean
  hooks?: any
}

export default function getConf(dir: string): IConf {
  const { config = {} } =
    cosmiconfig('husky', {
      rcExtensions: true,
      sync: true
    }).load(dir) || {}

  const defaults: IConf = {
    skipCI: true
  }

  return { ...defaults, ...config }
}
