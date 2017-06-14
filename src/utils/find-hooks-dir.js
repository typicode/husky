const findParentDir = require('find-parent-dir')

function findHooksDir(dirname) {
  const dir = findParentDir.sync(dirname, '.git')

  if (dir) {
    const gitDir = path.join(dir, '.git')
    const stats = fs.lstatSync(gitDir)

    if (stats.isFile()) {
      // Expect following format
      // git: pathToGit
      gitDir = fs.readFileSync(gitDir, 'utf-8').split(':')[1].trim()

      return path.resolve(dir, gitDir, 'hooks')
    }

    return path.join(gitDir, 'hooks')
  }
}

module.exports = findHooksDir
