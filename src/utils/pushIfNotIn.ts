import { isArray } from "./isArray.js"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { union } from "./union.js"

/**
 * Pushes all the items passed to the first array if it doesn't already contain them.
 *
 * **This does NOT check the array for duplicates.**
 *
 * This is because we can just pass an empty array as the first argument to achieve the same thing if we want this to behave like a union (though {@link union} is available as a wrapper), while not losing any performance when we're sure there are no duplicates in the first array (e.g. we got it from `Object.keys`).
 *
 * ```ts
 * const arr1 = ["a", "b", "b"]
 * const arr2 = ["c", "c"]
 * const arrUnion = pushIfNotIn(arr1, arr2)
 * // or pushIfNotIn(arr1, ["c", "c"])
 * // arrUnion = arr1
 * // arr1/arrUnion = ["a", "b", "b", "c"]
 *
 * // or to use like unique union
 * const arr1 = ["a", "b", "b"]
 * const arr2 = ["c", "c"]
 * const arrUnion = pushIfNotIn([], arr1, arr2)
 * // arrUnion = ["a", "b", "c"]
 * ```
 */
export function pushIfNotIn<
	TMutated extends
		any[] =
		any[],
		T = any,
>(
	mutated: TMutated,
	...entries: readonly (readonly T[])[]
	// prevent never[] from getting added when [] is passed to avoid mutation
): TMutated extends never[] ? T[] : TMutated & T[] {
	for (const value of entries) {
		if (isArray(value)) {
			for (const val of value) {
				if (!mutated.includes(val)) mutated.push(val)
			}
		}
	}
	return mutated as any
}
