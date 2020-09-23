/** @packageDocumentation @module utils */

/**
 * Returns true if a string is blank/empty (equal to "").
 */
export function is_blank<T extends "">(value: string | T): value is T {
	return value.length === 0
}
