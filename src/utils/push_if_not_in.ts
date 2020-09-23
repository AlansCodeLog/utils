/** @packageDocumentation @module utils */

/**
 * Pushes all the items of the passed arrays to the first array if it doesn't already contain them.
 *
 * **This does NOT check the first array for duplicates.**
 *
 * This is because we can just pass an empty array as the first argument to achieve the same thing if we want this to behave like a union (though {@link union} is available as a wrapper), while not losing any performance when we're sure there are no duplicates in the first array (e.g. we got it from `Object.keys`).
 *
 * ```ts
 * let arr1 = ["a", "b", "b"]
 * let arr2 = ["c", "c"]
 * let arr_union = push_if_not_in(arr1, arr2)
 * // arr_union = arr1
 * // arr1/arr_union = ["a", "b", "b", "c"]
 *
 * // or to use like unique union
 * let arr1 = ["a", "b", "b"]
 * let arr2 = ["c", "c"]
 * let arr_union = push_if_not_in([], arr1, arr2)
 * // arr_union = ["a", "b", "c"]
 * ```
 *
 */
export function push_if_not_in<
	TMutated extends
		any[] =
		any[],
	T extends
		any[] | readonly any[] =
		any[] | readonly any[]
>(mutated: TMutated, ...arrays: T[]): TMutated & T {
	for (let array of arrays) {
		for (let key of array) {
			if (!mutated.includes(key)) mutated.push(key)
		}
	}
	return mutated as TMutated & T
}
