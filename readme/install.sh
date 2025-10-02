#!/usr/bin/env bash
# add as dependency to your project
deno add jsr:@hugojosefson/resvg-deno

# ...or...

# create and enter a directory for the script
mkdir -p "resvg-deno"
cd       "resvg-deno"

# download+extract the script, into current directory
curl -fsSL "https://github.com/hugojosefson/resvg-deno/tarball/main" \
  | tar -xzv --strip-components=1
