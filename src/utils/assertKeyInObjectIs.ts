/**
 * Asserts the key's value is the given value (runtime only, does not do types\*).
 *
 * Throws nice error if it isn't. Error message is customizable.
 *
 * \*This seems like a limitation of typescript for the moment. See [#46184](https://github.com/microsoft/TypeScript/issues/46184)
 */
export function assertKeyInObjectIs<T extends Record<string, any>, TKey extends keyof T, TVal extends T[TKey]>(
	obj: T,
	key: TKey,
	val: TVal,
	errorMessage?: string,
): asserts obj is T & Record<TKey, TVal> {
	const objVal = obj[key]
	if (objVal !== val) {
		throw new Error(errorMessage ?? `${key as string} is not ${val}.`)
	}
}
