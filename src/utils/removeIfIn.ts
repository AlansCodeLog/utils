/**
 * Removes the passed items if they exist in the array, otherwise does nothing.
 *
 * Mutates the given array.
 *
 * ```ts
 * const arr1 = ["a", "b", "c"]
 * const arr2 = ["a", "b"]
 * const res = removeIfIn(arr1, ...arr2) // ["c"]
 */
export function removeIfIn<T extends any[]>(
	mutated: T,
	...entries: any[]
	// prevent never[] from getting added when [] is passed to avoid mutation
): T {
	for (const value of entries) {
		const index = mutated.indexOf(value)
		if (index > -1) {
			mutated.splice(index, 1)
		}
	}
	return mutated
}
