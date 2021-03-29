import { PackageJson } from 'type-fest'

export function updatePkg(pkg: PackageJson, isYarn2: boolean): PackageJson {
  pkg.devDependencies ||= {}
  pkg.devDependencies.husky = '^6.0.0'
  if (isYarn2) {
    pkg.scripts ||= {}
    pkg.scripts.postinstall = 'husky install'
    if (pkg.private !== true) {
      pkg.scripts.prepublishOnly = 'pinst --disable'
      pkg.scripts.postpublish = 'pinst --enable'
      pkg.devDependencies.pinst = '^2.0.0'
    }
  } else {
    pkg.scripts ||= {}
    pkg.scripts.prepare = 'husky install'
  }

  return pkg
}
