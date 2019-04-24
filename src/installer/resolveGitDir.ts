import findUp from 'find-up'
import fs from 'fs'
import path from 'path'

export default function(cwd: string | undefined): string | null {
  const foundPath = findUp.sync('.git', { cwd })

  if (foundPath) {
    const stats = fs.lstatSync(foundPath)

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
