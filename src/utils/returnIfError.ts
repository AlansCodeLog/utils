import type { AnyFunction } from "../types/AnyFunction.js"
import type { AnyPromise } from "../types/AnyPromise.js"

/**
 * Returns the error of the given function if it throws, otherwise returns the result. Also works with promises (works like a `.catch(e => e)`).
 *
 * Note that it's impossible to type this properly, you can change the return type of the error using the first type param.
 *
 * ```ts
 * const maybeError = returnError<KnownPossibleError>(funcThatMaybeThrows)
 * ```
 *
 */
export function returnIfError<
	TError extends Error,
	T extends AnyFunction | AnyPromise,
>(func: T): T extends AnyFunction ? ReturnType<T> : T | TError {
	if ("catch" in func) return func().catch((e: any) => e)
	try {
		return func()
	} catch (e: unknown) {
		return e as any
	}
}
