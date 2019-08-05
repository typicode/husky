import fs from 'fs'
import path from 'path'

enum RunCommand {
  NPX = 'npx --no-install',
  PNPX = 'pnpx --no-install',
  YARN = 'yarn run'
}

interface Context {
  createdAt: string
  homepage: string
  pathToUserPkgDir: string
  pkgDirectory?: string
  pkgHomepage?: string
  runCommand: RunCommand
  version: string
}

// Used to identify scripts created by Husky
export const huskyIdentifier = '# husky'

// Experimental
const huskyrc = '.huskyrc'

// Render script
const render = ({
  createdAt,
  homepage,
  pathToUserPkgDir,
  pkgDirectory,
  pkgHomepage,
  runCommand,
  version
}: Context): string => `#!/bin/sh
${huskyIdentifier}

# Hook created by Husky (${homepage})
#   Version: ${version}
#   At: ${createdAt}
#   From: ${pkgDirectory} (${pkgHomepage})

hookName=\`basename "$0"\`
gitRoot="$(git rev-parse --show-toplevel)"
gitParams="$*"

debug() {
  if [ "$HUSKY_DEBUG" = "true" ] || [ "$HUSKY_DEBUG" = "1" ]; then
    echo "husky:debug $1"
  fi
}

command_exists () {
  command -v "$1" >/dev/null 2>&1
}

if [ -f ~/${huskyrc} ]; then
  debug "source ~/${huskyrc}"
  . ~/${huskyrc}
fi

if [ -f "$gitRoot"/${huskyrc}.local ]; then
  debug "source $gitRoot/${huskyrc}.local"
  . "$gitRoot"/${huskyrc}.local
fi

debug "$hookName hook started"

if [ "$HUSKY_SKIP_HOOKS" = "true" ] || [ "$HUSKY_SKIP_HOOKS" = "1" ]; then
  debug "HUSKY_SKIP_HOOKS is set to $HUSKY_SKIP_HOOKS, skipping hook"
  exit 0
fi

# TODO check if npm/yarn/pnpm command exists

cd "${pathToUserPkgDir}"
${runCommand} husky-run $hookName "$gitParams"

exitCode=$?
debug "${runCommand} husky-run exited with $exitCode exit code"
if [ $exitCode -eq 127 ]; then
  echo "Can't find Husky, skipping $hookName hook"
  echo "You can reinstall it using 'npm install husky --save-dev' or delete this hook"
else
  exit $exitCode
fi
`

/**
 * @param {string} pathToUserPkgDir - relative path from git dir to dir containing package.json
 * @param {string} pmName - e.g. npm, pnpm or yarn
 * @returns {string} script
 */
export default function(pathToUserPkgDir: string, pmName: string): string {
  // Env variable
  const pkgHomepage = process && process.env && process.env.npm_package_homepage
  const pkgDirectory = process && process.env && process.env.PWD

  // Husky package.json
  const { homepage, version } = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')
  )

  // Created at
  const createdAt = new Date().toLocaleString()

  // Script runner command
  let runCommand
  switch (pmName) {
    case 'npm':
      runCommand = RunCommand.NPX
      break
    case 'pnpm':
      runCommand = RunCommand.PNPX
      break
    case 'yarn':
      runCommand = RunCommand.YARN
      break
    default:
      throw new Error(
        `Unknown package manager: ${pmName}\nnpm_config_user_agent: ${process.env.npm_config_user_agent}`
      )
  }

  // Render script
  return render({
    createdAt,
    homepage,
    pathToUserPkgDir,
    pkgDirectory,
    pkgHomepage,
    runCommand,
    version
  })
}
