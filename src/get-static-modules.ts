import type { ResvgClassType } from "./re-exported-types.ts";
import * as knownGoodResvgModule from "@resvg/resvg-wasm";
import knownGoodWasmBytes from "@resvg/resvg-wasm/index_bg.wasm" with {
  type: "bytes",
};
import type { ResvgModules } from "./resvg-modules.ts";

export function getStaticModules(): ResvgModules<typeof ResvgClassType> {
  return {
    resvgModule: knownGoodResvgModule,
    initInput: knownGoodWasmBytes,
  } satisfies ResvgModules<typeof ResvgClassType>;
}
