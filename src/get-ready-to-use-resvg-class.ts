import type { ResvgClassType } from "./re-exported-types.ts";
import type { ResvgModules } from "./resvg-modules.ts";
import { runIfNotAlreadyRun } from "./run-if-not-already-run.ts";

export async function getReadyToUseResvgClass<R extends typeof ResvgClassType>(
  resvgModules: ResvgModules<R>,
): Promise<R> {
  const { resvgModule, initInput } = resvgModules;
  const { Resvg, initWasm } = resvgModule;
  await runIfNotAlreadyRun(initWasm, initInput);
  return Resvg;
}
