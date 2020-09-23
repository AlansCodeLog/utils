/** @packageDocumentation @module utils */

/**
 * Returns true if a string is all whitespace ({@link is_blank} will only return true if the `string ==== ""`).
 *
 */
export function is_whitespace(value: string): boolean {
	return value.trim().length === 0
}
