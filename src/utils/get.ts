/**
 * A dead simple, no frills get function.
 *
 * ```ts
 * const obj = { a: { b: ["c"]} }
 * const value = get(obj, ["a", "b", 0])
 * const value = get(obj, []) // undefined
 * ```
 */
export function get(obj: any, keys: (string | number)[]): any {
	let curr = obj
	for (const key of keys) {
		if (curr[key] !== undefined) {
			curr = curr[key]
		} else return undefined
	}
	return keys.length > 0 ? curr : undefined
}
