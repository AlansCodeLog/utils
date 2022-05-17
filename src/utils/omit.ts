/**
 * Returns a copy of the object with only the specified properties.
 *
 * Optionally never define undefined properties with `ignoreUndefined`.
 */
export function omit<T, TKeys extends (keyof T)[]>(obj: T, keys: TKeys, ignoreUndefined: boolean = false): Omit<T, TKeys[number]> {
	const copy: any = {}
	for (const key of keys) {
		if (ignoreUndefined) {
			if (obj[key]) {
				copy[key] = obj[key]
			}
		} else {
			copy[key] = obj[key]
		}
	}
	return copy
}
