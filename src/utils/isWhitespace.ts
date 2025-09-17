// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { isBlank } from "./isBlank.js"
/**
 * Returns true if a string is all whitespace ({@link isBlank} will only return true if the `string ==== ""`).
 *
 */
export function isWhitespace(value: string): boolean {
	return value.trim().length === 0
}
