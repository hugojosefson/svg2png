import type { UnknownFunction } from "./unknown-function.ts";

const previousResults = new Map<
  UnknownFunction,
  Promise<unknown>
>();

/**
 * Runs the given function only if it hasn't been run before.
 * If the function has already been run, it returns the existing promise, which resolves to the result of the first invocation.
 *
 * This is useful for ensuring that initialization code or other one-time operations are only executed once,
 * even if multiple parts of the code attempt to run them concurrently.
 * @param fn - The function to run if it hasn't been run before.
 * @param args - Arguments to pass to the function when invoking it.
 * @returns A promise that resolves to the result of the first function invocation.
 */
export async function runIfNotAlreadyRun<
  Args extends unknown[],
  Return,
  Fn extends (...args: Args) => Return,
>(
  fn: Fn,
  ...args: Args
): Promise<Return> {
  if (!previousResults.has(fn as unknown as UnknownFunction)) {
    const resultPromise: Promise<Return> = Promise.resolve().then(() =>
      fn(...args)
    );
    previousResults.set(
      fn as unknown as UnknownFunction,
      resultPromise,
    );
  }
  return await previousResults.get(fn as unknown as UnknownFunction) as Promise<
    Return
  >;
}
