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
 * const arrUnion = pushIfNotIn(arr1, ...arr2)
 * // arrUnion = arr1
 * // arr1/arrUnion = ["a", "b", "b", "c"]
 *
 * // or to use like unique union
 * const arr1 = ["a", "b", "b"]
 * const arr2 = ["c", "c"]
 * const arrUnion = pushIfNotIn([], ...arr1, ...arr2)
 * // arrUnion = ["a", "b", "c"]
 * ```
 */
export function pushIfNotIn<
	TMutated extends
		any[] =
		any[],
	T extends
		any[] | readonly any[] =
		any[] | readonly any[],
>(
	mutated: TMutated,
	...arrays: T
	// prevent never[] from getting added when [] is passed to avoid mutation
): TMutated extends never[] ? T : TMutated & T {
	for (const array of arrays) {
		for (const key of array) {
			if (!mutated.includes(key)) mutated.push(key)
		}
	}
	return mutated as any
}
