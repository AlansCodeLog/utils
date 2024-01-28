import { keys as objectKeys } from "./keys.js"
/**
 * Returns a copy of the object without the specified properties.
 */
export function omit<T extends {}, TKeys extends (keyof T)[]>(obj: T, keys: TKeys): Omit<T, TKeys[number]> {
	const copy: any = {}
	for (const key of objectKeys(obj)) {
		if (!keys.includes(key)) {
			copy[key] = obj[key]
		}
	}
	return copy
}
