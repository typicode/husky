import path from 'path'
import slash from 'slash'
import { readPkg } from '../read-pkg'

interface Context {
  createdAt: string
  huskyHomepage?: string
  huskyVersion?: string
  pkgDirectory?: string
  pkgHomepage?: string
  pmName: string
  relativeUserPkgDir: string
}

// Used to identify scripts created by Husky
export const huskyIdentifier = '# husky'

// Experimental
const huskyrc = '.huskyrc'

// Render script
const render = ({
  createdAt,
  huskyHomepage,
  huskyVersion,
  pkgDirectory,
  pkgHomepage,
  pmName,
  relativeUserPkgDir
}: Context): string => `#!/bin/sh
${huskyIdentifier}

# Hook created by Husky v${huskyVersion} (${huskyHomepage})
#   At: ${createdAt}
#   From: ${pkgDirectory} (${pkgHomepage})
#   With: ${pmName}

gitRoot="$(git rev-parse --show-toplevel)"
gitParams="$*"
hookName=\`basename "$0"\`
packageManager=${pmName}

debug() {
  if [ "$HUSKY_DEBUG" = "true" ] || [ "$HUSKY_DEBUG" = "1" ]; then
    echo "husky:debug $1"
  fi
}

command_exists () {
  command -v "$1" >/dev/null 2>&1
}

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

debug "husky v${huskyVersion} (created at ${createdAt})"
debug "$hookName hook started"
debug "Current working directory is \`pwd\`"

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

cd "${relativeUserPkgDir}"

case $hookName in
  "pre-push"|"pre-receive"|"post-receive"|"post-rewrite")
    export HUSKY_GIT_STDIN="\`cat\`";;
esac

if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi

case $packageManager in
  "npm") run_command npx --no-install;;
  "pnpm") run_command pnpx --no-install;;
  "yarn") run_command yarn run --silent;;
  "*") echo "Unknown package manager: $packageManager"; exit 0;;
esac
`

/**
 * @param {string} relativeUserPkgDir - relative path from git dir to dir containing user package.json
 * @param {string} packageManager - e.g. npm, pnpm or yarn
 * @returns {string} script
 */
export default function({
  relativeUserPkgDir,
  pmName
}: {
  relativeUserPkgDir: string
  pmName: string
}): string {
  const pkgHomepage = process.env.npm_package_homepage
  const pkgDirectory = process.env.PWD

  const { homepage: huskyHomepage, version: huskyVersion } = readPkg(
    path.join(__dirname, '../..')
  )

  const createdAt = new Date().toLocaleString()

  if (!['npm', 'pnpm', 'yarn'].includes(pmName)) {
    throw new Error(
      `Unknown package manager: ${pmName} (npm_config_user_agent: ${process.env.npm_config_user_agent})`
    )
  }

  const normalizedPath = slash(relativeUserPkgDir)

  // Render script
  return render({
    createdAt,
    huskyHomepage,
    huskyVersion,
    relativeUserPkgDir: normalizedPath,
    pkgDirectory,
    pkgHomepage,
    pmName
  })
}
