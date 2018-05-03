import * as findUp from 'find-up'
import * as fs from 'fs'
import * as path from 'path'

export default function(cwd: string): string | null {
  const foundPath = findUp.sync('.git', { cwd })

  console.log({ foundPath })
  if (foundPath) {
    const stats = fs.lstatSync(foundPath)

    console.log('is file', stats.isFile())
    // If it's a .git file resolve path
    if (stats.isFile()) {
      // Expect following format
      // git: pathToGit
      // On Windows pathToGit can contain ':' (example "gitdir: C:/Some/Path")
      const gitFileData = fs.readFileSync(foundPath, 'utf-8')
      const resolvedGitDir = gitFileData
        .split(':')
        .slice(1)
        .join(':')
        .trim()
      return path.resolve(path.dirname(foundPath), resolvedGitDir)
    }

    // Else return path to .git directory
    return foundPath
  }

  return null
}
