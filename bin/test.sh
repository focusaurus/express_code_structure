#!/bin/bash
cd $(dirname "$0")/..

files="$@"
if [[ $# -eq 0 ]]; then
  files=$(find app -name '*.ntest.js' -print0 | xargs -0)
fi
./node_modules/.bin/tape ${files}
