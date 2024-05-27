/**
 * Finds all duplicated elements in an array and returns an array containing one of each.
 *
 * Can be passed a custom equality function, see `equals` option.
 */
export function findDuplicates<T = any>(
	arr: T[],
	{ equals }:
	{
		/** Use a custom equality comparison function to check for a complex value's equality (e.g. two different instanced of a class or object might be considered equal if their properties are.) */
		equals?: (val: T, other: T, found: T[]) => boolean | undefined
	} = {},
): T[] {
	const found: T[] = []
	for (let i = 0; i < arr.length; i++) {
		const val = arr[i]

		let inArray!: boolean
		let inFound!: boolean

		if (equals) {
			// using findIndex to avoid issues where the value itself might be undefined
			inArray = arr.findIndex((other, j) => j > i && equals(val, other, found)) !== -1
			inFound = found.findIndex(other => equals(val, other, found)) !== -1
		} else {
			inArray = arr.includes(val, i + 1)
			inFound = found.includes(val)
		}
		if (inArray && !inFound) found.push(val)
	}
	return found
}
