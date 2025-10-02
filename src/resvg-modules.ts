import type {
  InitInput,
  initWasmFunctionType,
  ResvgClassType,
} from "./re-exported-types.ts";

export type ResvgModule<
  R extends typeof ResvgClassType,
> = {
  Resvg: R;
  initWasm: typeof initWasmFunctionType;
};
export type ResvgModules<R extends typeof ResvgClassType> = {
  resvgModule: ResvgModule<R>;
  initInput: InitInput;
};
