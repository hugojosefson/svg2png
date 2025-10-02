import type { ResvgClassType } from "./re-exported-types.ts";
import * as resvgModule from "@resvg/resvg-wasm";
import { wasmBytes } from "./index_bg.wasm.ts";
import type { ResvgModules } from "./resvg-modules.ts";

export function getStaticModules(): ResvgModules<typeof ResvgClassType> {
  return {
    resvgModule: resvgModule,
    initInput: wasmBytes,
  } satisfies ResvgModules<typeof ResvgClassType>;
}
