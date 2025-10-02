#!/usr/bin/env -S deno run --unstable-raw-imports --allow-write=./src/index_bg.wasm.ts --allow-run=deno
import { encodeBase64 } from "@std/encoding/base64";
import bytes from "@resvg/resvg-wasm/index_bg.wasm" with { type: "bytes" };
import { run } from "@hugojosefson/run-simple";

const FILE_PATH = "./src/index_bg.wasm.ts";

const PREAMBLE = `// This file is auto-generated. Do not edit manually.
// To update, run: deno task update-wasm

/** The base64-encoded bytes of the resvg wasm module. */
export const wasmBytesBase64 = "`;

const POSTAMBLE = `";

  import { decodeBase64 } from "@std/encoding/base64";

  /** The raw bytes of the resvg wasm module. */
  export const wasmBytes = decodeBase64(wasmBytesBase64);
`;

const base64 = encodeBase64(bytes);
const fileContents = `${PREAMBLE}${base64}${POSTAMBLE}`;
await Deno.writeTextFile(FILE_PATH, fileContents);
await run(["deno", "fmt", FILE_PATH]);
console.log(`Updated ${FILE_PATH}`);
