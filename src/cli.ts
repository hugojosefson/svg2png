#!/bin/sh
// 2>/dev/null;DENO_VERSION_RANGE="^2.5.2";DENO_RUN_ARGS="";set -e;V="$DENO_VERSION_RANGE";A="$DENO_RUN_ARGS";h(){ [ -x "$(command -v "$1" 2>&1)" ];};n(){ [ "$(id -u)" != 0 ];};g(){ if n && ! h;then return;fi;u="$(n&&echo sudo||:)";if h brew;then echo "brew install $1";elif h apt;then echo "($u apt update && $u DEBIAN_FRONTEND=noninteractive apt install -y $1)";elif h yum;then echo "$u yum install -y $1";elif h pacman;then echo "$u pacman -yS --noconfirm $1";elif h opkg-install;then echo "$u opkg-install $1";fi;};p(){ q="$(g "$1")";if [ -z "$q" ];then echo "Please install '$1' manually, then try again.">&2;exit 1;fi;eval "o=\"\$(set +o)\";set -x;$q;set +x;eval \"\$o\"">&2;};f(){ h "$1"||p "$1";};w(){ [ -n "$1" ] && "$1" -V >/dev/null 2>&1;};U="$(l=$(printf "%s" "$V"|wc -c);for i in $(seq 1 $l);do c=$(printf "%s" "$V"|cut -c $i);printf '%%%02X' "'$c";done)";D="$(w "$(command -v deno||:)"||:)";t(){ i="$(if h findmnt;then findmnt -Ononoexec,noro -ttmpfs -nboAVAIL,TARGET|sort -rn|while IFS=$'\n\t ' read -r a m;do [ "$a" -ge 150000000 ]&&[ -d "$m" ]&&printf %s "$m"&&break||:;done;fi)";printf %s "${i:-"${TMPDIR:-/tmp}"}";};s(){ deno eval "import{satisfies as e}from'https://deno.land/x/semver@v1.4.1/mod.ts';Deno.exit(e(Deno.version.deno,'$V')?0:1);">/dev/null 2>&1;};e(){ R="$(t)/deno-range-$V/bin";mkdir -p "$R";export PATH="$R:$PATH";s&&return;f curl;v="$(curl -sSfL "https://semver-version.deno.dev/api/github/denoland/deno/$U")";i="$(t)/deno-$v";ln -sf "$i/bin/deno" "$R/deno";s && return;f unzip;([ "${A#*-q}" != "$A" ]&&exec 2>/dev/null;curl -fsSL https://deno.land/install.sh|DENO_INSTALL="$i" sh -s $DENO_INSTALL_ARGS "$v"|grep -iv discord>&2);};e;exec deno run $A "$0" "$@"

/**
 * @fileoverview converts svg from stdin to png on stdout
 * @example
 *   deno run jsr:@hugojosefson/svg2png <image.svg >image.png
 */

import { svg2png } from "./svg2png.ts";
import { toText } from "@std/streams";
import { writeAll } from "@std/io";
import { parseArgs } from "@std/cli";

const USAGE = `
Usage:
  deno run jsr:@hugojosefson/svg2png < input.svg > output.png
  deno run jsr:@hugojosefson/svg2png --config-json '{"fitTo":{"mode":"width","value":1200}}' < input.svg > output_w1200.png

Reads SVG from stdin, writes PNG to stdout.

Options:
  --help, -h     Show this help message and exit
  --config-json  String of JSON configuration for resvg, see ResvgRenderOptions
                 https://github.com/thx/resvg-js/blob/main/wasm/index.d.ts
`.trim();

export async function main(args: string[]) {
  const parsed = parseArgs(args, {
    boolean: ["help"],
    string: ["configJson"],
    alias: { h: "help" },
    default: { help: false, configJson: "{}" },
  });

  if (parsed.help) {
    console.log(USAGE);
    return;
  }

  if (parsed._.length > 0) {
    console.error("Unexpected positional arguments:", parsed._);
    console.error(USAGE);
    Deno.exit(2);
  }

  // parse any config
  const config = JSON.parse(parsed.configJson);
  if (Object.keys(config).length > 0) {
    console.error("Using config:", config);
  }

  // read svg from stdin
  const svg = await toText(Deno.stdin.readable);

  // convert to png
  const png = await svg2png(svg, config);

  // write png to stdout
  await writeAll(Deno.stdout, png);
}

if (import.meta.main) {
  await main(Deno.args);
}
