import { getStaticModules } from "./get-static-modules.ts";
import { getReadyToUseResvgClass } from "./get-ready-to-use-resvg-class.ts";
import type {
  ResvgClassType,
  ResvgRenderOptions,
} from "./re-exported-types.ts";
import type { ResvgModules } from "./resvg-modules.ts";

export type { ResvgRenderOptions };

/**
 * Converts SVG to PNG.
 * @param svg - SVG content as string | Uint8Array
 * @param options - Optional rendering options for Resvg
 * @param resvgModules - Optional Resvg modules, defaults to static import
 * @returns A promise that resolves to a Uint8Array containing the PNG data
 */
export async function svg2png(
  svg: string | Uint8Array,
  options?: ResvgRenderOptions,
  resvgModules: ResvgModules<typeof ResvgClassType> = getStaticModules(),
): Promise<Uint8Array<ArrayBuffer>> {
  const Resvg: typeof ResvgClassType = await getReadyToUseResvgClass(
    resvgModules,
  );
  const resvg = new Resvg(svg, options);
  return Uint8Array.from(resvg.render().asPng());
}
