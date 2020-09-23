/** @packageDocumentation @module utils */

/**
 * Returns an array without any duplicates (does not mutate the array by default).
 *
 * Pass `{ mutate: true }` to mutate the array ( counterintuitively this might be slightly slower ).
 */
export function dedupe<T extends any[] = any[]>(array: T,
	{
		mutate = false,
	}: {
		mutate?: boolean
	} = {}
): T {
	if (!mutate) {
		return [...new Set(array)] as T
	} else {
		let seen = new Set()
		for (let i = 0; i < array.length; i++) {
			let value = array[i]
			if (seen.has(value)) {
				array.splice(i, 1)
				i--
			} else {
				seen.add(value)
			}
		}
		return array
	}
}
