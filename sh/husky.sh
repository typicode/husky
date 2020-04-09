debug () {
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

hookIsDefined () {
  grep -qs $hookName \
    package.json \
    .huskyrc \
    .huskyrc.json \
    .huskyrc.yaml \
    .huskyrc.yml
}

huskyVersion="0.0.0"
gitParams="$*"
hookName="$(basename "$0")"

debug "husky v$huskyVersion - $hookName"

# Skip if HUSKY_SKIP_HOOKS is set
if [ "$HUSKY_SKIP_HOOKS" = "true" ] || [ "$HUSKY_SKIP_HOOKS" = "1" ]; then
  debug "HUSKY_SKIP_HOOKS is set to $HUSKY_SKIP_HOOKS, skipping hook"
  exit 0
fi

# Source user var and change directory
. "$(dirname "$0")/husky.local.sh"
debug "Current working directory is $(pwd)"

# Skip fast if hookName is not defined
# Don't skip if .huskyrc.js or .huskyrc.config.js are used as the heuristic could
# fail due to the dynamic aspect of JS. For example:
# `"pre-" + "commit"` or `require('./config/hooks')`)
if [ ! -f .huskyrc.js ] && [ ! -f husky.config.js ] && ! hookIsDefined; then
  debug "$hookName config not found, skipping hook"
  exit 0
fi

# Source user ~/.huskyrc
if [ -f ~/.huskyrc ]; then
  debug "source ~/.huskyrc"
  . ~/.huskyrc
fi

# Set HUSKY_GIT_STDIN from stdin
case $hookName in
  "pre-push"|"post-rewrite")
    export HUSKY_GIT_STDIN="$(cat)";;
esac

# Windows 10, Git Bash and Yarn 1 installer
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi

# Run husky-run with the package manager used to install Husky
case $packageManager in
  "npm") run_command npx --no-install;;
  "npminstall") run_command npx --no-install;;
  "pnpm") run_command pnpx --no-install;;
  "yarn") run_command yarn run --silent;;
  *) echo "Unknown package manager: $packageManager"; exit 0;;
esac
