import fs from 'fs'
import path from 'path'
import slash from 'slash'

interface Context {
  createdAt: string
  homepage: string
  packageManager: string
  pathToUserPkgDir: string
  pkgDirectory?: string
  pkgHomepage?: string
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
  packageManager,
  pathToUserPkgDir,
  pkgDirectory,
  pkgHomepage,
  version
}: Context): string => `#!/bin/sh
${huskyIdentifier}

# Hook created by Husky v${version} (${homepage})
#   At: ${createdAt}
#   From: ${pkgDirectory} (${pkgHomepage})
#   With: ${packageManager}

gitRoot="$(git rev-parse --show-toplevel)"
gitParams="$*"
hookName=\`basename "$0"\`
packageManager=${packageManager}

debug() {
  if [ "$HUSKY_DEBUG" = "true" ] || [ "$HUSKY_DEBUG" = "1" ]; then
    echo "husky:debug $1"
  fi
}

command_exists () {
  command -v "$1" >/dev/null 2>&1
}

debug "husky v${version} (created at ${createdAt})"
debug "$hookName hook started"
debug "Current working directory is \`pwd\`"

run_command () {
  if command_exists "$1"; then
    "$@" husky-run $hookName "$gitParams"

    exitCode="$?"
    debug "$* husky-run exited with $exitCode exit code"

    if [ $exitCode -eq 127 ]; then
      echo "Can't find Husky, skipping $hookName hook"
      echo "You can reinstall it using 'npm install husky --save-dev' or delete this hook"
    else
      exit $exitCode
    fi

  else
    echo "Can't find $1 in PATH: $PATH"
    echo "Skipping $hookName hook"
    exit 0
  fi
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

cd "${pathToUserPkgDir}"
case $packageManager in
  "npm") run_command npx --no-install;;
  "pnpm") run_command pnpx --no-install;;
  "yarn") run_command yarn;;
  "*") echo "Unknow package manager: $packageManager"; exit 0;;
esac
`

/**
 * @param {string} pathToUserPkgDir - relative path from git dir to dir containing package.json
 * @param {string} packageManager - e.g. npm, pnpm or yarn
 * @returns {string} script
 */
export default function(
  pathToUserPkgDir: string,
  packageManager: string
): string {
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
  if (!['npm', 'pnpm', 'yarn'].includes(packageManager)) {
    throw new Error(
      `Unknown package manager: ${packageManager} (npm_config_user_agent: ${process.env.npm_config_user_agent})`
    )
  }

  // Render script
  return render({
    createdAt,
    homepage,
    packageManager,
    // Normalize path
    pathToUserPkgDir: slash(pathToUserPkgDir),
    pkgDirectory,
    pkgHomepage,
    version
  })
}
