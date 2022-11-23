import { pushIfNotIn } from "./pushIfNotIn.js"

/**
 * Returns a unique union of all the values passed. Useful for deduplicating arrays.
 * ```ts
 *
 * const union = union(["a"], ["a", "b"], ["c"]) // ["a", "b", "c"]
 * ```
 *
 * Uses {@link pushIfNotIn} internally.
 */
export function union<
	T extends
		any[] | readonly any[] =
		any[] | readonly any[],
>(...arrays: T[]): T {
	return pushIfNotIn([] as any, ...arrays.flat())
}
