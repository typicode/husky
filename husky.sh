#!/usr/bin/env sh
[ "$HUSKY" = "2" ] && set -x
h="${0##*/}"
s="${0%/*/*}/$h"

[ ! -f "$s" ] && exit 0

for f in "${XDG_CONFIG_HOME:-$HOME/.config}/husky/init.sh" "$HOME/.huskyrc.sh"; do
	# shellcheck disable=SC1090
	[ -f "$f" ] && . "$f"
done

[ "$HUSKY" = "0" ] && exit 0

[ "${SHELL##*/}" = "zsh" ] && sh="zsh" || sh="sh"

# shellcheck disable=SC2155
[ "$h" = "pre-commit" ] && export STAGED="$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')"
export PATH="./node_modules/.bin:$PATH"

$sh -e "$s" "$@"
c=$?

[ $c != 0 ] && echo "husky - $h script failed (code $c)"
[ $c = 127 ] && echo "husky - command not found in PATH=$PATH"
exit 1
