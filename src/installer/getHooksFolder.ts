import fs from 'fs'
import path from 'path'

export default function(resolvedGitDir: string, userPkgDir: string): string {
  try {
    const config = fs.readFileSync(path.join(resolvedGitDir, 'config'), 'utf-8')
    const hookPathMath = config.match(/hooksPath = (.+)\n?/)

    return hookPathMath === null
      ? path.resolve(resolvedGitDir, 'hooks')
      : path.resolve(userPkgDir, hookPathMath[1])
  } catch (e) {
    return path.resolve(resolvedGitDir, 'hooks')
  }
}
