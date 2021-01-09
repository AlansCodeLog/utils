/**
 * Wrapper around `Array.isArray`.
 */
export function isArray<T extends any [] | readonly any []>(value: T | any): value is T {
	return Array.isArray(value)
}
