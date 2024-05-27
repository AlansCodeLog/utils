/**
 * Returns an array without any duplicates (does not mutate the array by default, see `mutate` option).
 */
export function dedupe<T extends any[] = any[]>(array: T,
	{
		mutate = false,
	}: {
		/** Whether to mutate the array. Defaults to false because, counterintuitively, true might be slightly slower. */
		mutate?: boolean
	} = {},
): T {
	if (!mutate) {
		return [...new Set(array)] as T
	} else {
		const seen = new Set()
		for (let i = 0; i < array.length; i++) {
			const value = array[i]
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
