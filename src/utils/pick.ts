/**
 * Picks a list of properties from an object and returns them in a new object.
 */
export function pick<T, TKeys extends (keyof T)[]>(obj: T, keys: (keyof T)[]): Pick<T, TKeys[number]> {
	const copy: Partial<T> = {}
	for (const key of keys) {
		copy[key] = obj[key]
	}
	return copy as Pick<T, TKeys[number]>
}
