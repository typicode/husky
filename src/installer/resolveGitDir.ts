import * as findUp from 'find-up'
import * as fs from 'fs'
import * as path from 'path'

export default function findGitDir(cwd: string): string | null {
  const foundPath = findUp.sync('.git', { cwd })

  if (foundPath) {
    let gitDir = path.dirname(foundPath)
    const stats = fs.lstatSync(gitDir)

    // If it's a .git file resolve path
    if (stats.isFile()) {
      // Expect following format
      // git: pathToGit
      // On Windows pathToGit can contain ':' (example "gitdir: C:/Some/Path")
      const gitFileData = fs.readFileSync(gitDir, 'utf-8')
      gitDir = gitFileData
        .split(':')
        .slice(1)
        .join(':')
        .trim()

      return path.resolve(foundPath, gitDir)
    }

    // Else return path to .git directory
    return foundPath
  }

  return null
}
