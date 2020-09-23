/** @packageDocumentation @module utils */

/**
 * Throws an error if a position is not within a string's length.
 *
 * E.g. given the string "Hello", -5 to 5 are valid positions, others are not.
 */
export function assert_in_str_range(cursor: number, str: string): true {
	if (Math.abs(cursor) <= str.length) return true
	throw new Error(`Position ${cursor} is outside the string "${str}"'s range (${str.length}).`)
}
