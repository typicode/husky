#!/usr/bin/env sh
debug() {
  [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $1"
}

log() {
  echo "husky - $1"
}

exit_hook() {
  [ "$1" != 0 ] && log "$2 hook exited with code $1 (error)"
  [ "$1" = 127 ] && log "command not found in PATH=$PATH"
  exit "$1"
}

name="${0##*/}"
script="${0%/*/*}/$name"

debug "starting $name..."

if [ "$HUSKY" = "0" ] || [ ! -f "$script" ]; then
  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
  else
    debug "$script does not exist, skipping hook"
  fi
  exit 0
fi

for file in "${XDG_CONFIG_HOME:-$HOME/.config}/husky/init.sh" "$HOME/.huskyrc.sh"; 
  do if [ -f "$file" ]; then
    debug "sourcing $file"
    . "$file"
    break
  fi
done

if [ "${SHELL##*/}" = "zsh" ]; then
  debug "running $script with $SHELL"
  "$SHELL" -e "$script" "$@"
else
  debug "running $script with sh"
  sh -e "$script" "$@"
fi

exit_hook "$?" "$name"
