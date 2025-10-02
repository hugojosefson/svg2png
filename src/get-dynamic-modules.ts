import type { InitInput, ResvgClassType } from "./re-exported-types.ts";
import type { ResvgModule, ResvgModules } from "./resvg-modules.ts";

const RESVG_BASE_URL = `https://esm.sh/@resvg/resvg-wasm` as const;

export async function getDynamicModules<R extends typeof ResvgClassType>(
  version?: string,
): Promise<ResvgModules<R>> {
  const packageIdentifier = version
    ? `${RESVG_BASE_URL}@${version}` as const
    : RESVG_BASE_URL;
  const wasmPath = `${packageIdentifier}/index_bg.wasm` as const;
  const wasmModule = await import(wasmPath, { with: { type: "bytes" } });
  const wasmBytes = wasmModule.default;
  const initInput: InitInput = wasmBytes as InitInput;
  const resvgModule: ResvgModule<R> = await import(packageIdentifier);
  return { resvgModule, initInput } satisfies ResvgModules<R>;
}
