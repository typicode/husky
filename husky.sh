#!/usr/bin/env sh
debug() { [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $1"; }
log() { echo "husky - $1"; }

exit_hook() {
  [ "$1" != 0 ] && log "$2 hook exited with code $1 (error)"
  [ "$1" = 127 ] && log "command not found in PATH=$PATH"
  exit "$1"
}

name="${0##*/}"
script="${0%/*/*}/$name"

debug "starting $name..."
[ "$HUSKY" = "0" ] && { debug "HUSKY env variable is set to 0, skipping hook"; exit 0; }
[ ! -f "$script" ] && { debug "$script does not exist, skipping hook"; exit 0; }

for file in "${XDG_CONFIG_HOME:-$HOME/.config}/husky/init.sh" "$HOME/.huskyrc.sh"; do
  if [ -f "$file" ]; then
    debug "sourcing $file"
    # shellcheck disable=SC1090
    . "$file"
    break
  fi
done

[ "${SHELL##*/}" = "zsh" ] && shell="$SHELL" || shell="sh"
debug "running $script with $shell"
$shell -e "$script" "$@"

exit_hook "$?" "$name"
