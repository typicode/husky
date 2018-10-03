import * as cosmiconfig from 'cosmiconfig'

interface IConf {
  skipCI: boolean
  tty: boolean
  hooks?: any
}

export default function getConf(dir: string): IConf {
  const explorer = cosmiconfig('husky')
  const { config = {} } = explorer.searchSync(dir) || {}

  const defaults: IConf = {
    skipCI: true,
    tty: false
  }

  return { ...defaults, ...config }
}
