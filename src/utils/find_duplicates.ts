/** @packageDocumentation @module utils */

/**
 * Finds all duplicated elements in an array and returns an array containing one of each.
 *
 * Can be passed a custom `equals` comparison function to check for a complex value's equality (e.g. two different instanced of a class or object might be considered equal if their properties are.)
 */
export function find_duplicates<T = any>(
	arr: T[],
	{ equals }:
	{ equals?: (val: T, other: T, found: T[]) => boolean | undefined } = {}
): T[] {
	let found: T[] = []
	for (let i = 0; i < arr.length; i++) {
		let val = arr[i]

		let in_array!: boolean
		let in_found!: boolean

		if (equals) {
			// using findIndex to avoid issues where the value itself might be undefined
			in_array = arr.findIndex((other, j) => j > i && equals(val, other, found)) !== -1
			in_found = found.findIndex(other => equals(val, other, found)) !== -1
		} else {
			in_array = arr.includes(val, i + 1)
			in_found = found.includes(val)
		}
		if (in_array && !in_found) found.push(val)
	}
	return found
}
