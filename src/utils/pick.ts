/**
 * Picks a list of properties from an object and returns them in a new object.
 *
 * Optionally never define properties that are not in the object with `ignoreNonexistent` (default is true).
 *
 * And never define properties that are undefined with `ignoreUndefined` (default is false).
 */
export function pick<T extends {}, TKeys extends (keyof T)[]>(obj: T, keys: (keyof T)[], { ignoreNonexistent = true, ignoreUndefined = false }: { ignoreNonexistent?: boolean, ignoreUndefined?: boolean } = {}): Pick<T, TKeys[number]> {
	const copy: Partial<T> = {}
	for (const key of keys) {
		if (ignoreNonexistent && !(key in obj)) continue
		if (ignoreUndefined && obj[key] === undefined) continue
		copy[key] = obj[key]
	}
	return copy as Pick<T, TKeys[number]>
}
