#!/bin/bash

# Start unofficial bash strict mode boilerplate
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -o errexit    # always exit on error
set -o errtrace   # trap errors in functions as well
set -o pipefail   # don't ignore exit codes when piping output
set -o posix      # more strict failures in subshells
# set -x          # enable debugging

IFS="$(printf "\n\t")"
# End unofficial bash strict mode boilerplate

cd "$(dirname "$0")/.."
PATH="$(npm bin):$PATH"
files="$@"
if [[ $# -eq 0 ]]; then
  files=$(find app -name '*.tape.js' -print0 | xargs -0)
fi
IFS=" "
tape ${files} | tap-dot
