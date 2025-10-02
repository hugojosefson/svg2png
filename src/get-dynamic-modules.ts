import { decodeBase64 } from "@std/encoding/base64";
import type { InitInput, ResvgClassType } from "./re-exported-types.ts";
import type { ResvgModule, ResvgModules } from "./resvg-modules.ts";

const RESVG_BASE_URL = `https://esm.sh/@resvg/resvg-wasm` as const;

export async function getDynamicModules<R extends typeof ResvgClassType>(
  version?: string,
): Promise<ResvgModules<R>> {
  const packageUrl = version
    ? `${RESVG_BASE_URL}@${version}` as const
    : RESVG_BASE_URL;
  const wasmUrl =
    `https://importable.hugojosefson.deno.net/${packageUrl}/index_bg.wasm` as const;
  const wasmB64 = (await import(wasmUrl)).default;
  const initInput: InitInput = decodeBase64(wasmB64);
  const resvgModule: ResvgModule<R> = await import(packageUrl);
  return { resvgModule, initInput } satisfies ResvgModules<R>;
}
