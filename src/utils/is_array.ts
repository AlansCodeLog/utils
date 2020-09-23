/** @packageDocumentation @module utils */

/**
 * Wrapper around `Array.isArray`.
 */
export function is_array<T extends any [] | readonly any []>(value: T | any): value is T {
	return Array.isArray(value)
}
