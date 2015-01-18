#!/bin/bash
cd $(dirname "$0")/..

files="$@"
if [[ $# -eq 0 ]]; then
  files="app"
fi
./node_modules/.bin/eslint ${files}
