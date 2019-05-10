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
      const gitDir = gitFileData
        .split(':')
        .slice(1)
        .join(':')
        .trim()
      const resolvedGitDir = path.resolve(path.dirname(foundPath), gitDir)

      // For git-worktree, check if commondir file exists and return that path
      const pathCommonDir = path.join(resolvedGitDir, 'commondir')
      if (fs.existsSync(pathCommonDir)) {
        const commondir = fs.readFileSync(pathCommonDir, 'utf-8').trim()
        const resolvedCommonGitDir = path.join(resolvedGitDir, commondir)
        return resolvedCommonGitDir
      }

      return resolvedGitDir
    }

    // Else return path to .git directory
    return foundPath
  }

  return null
}
