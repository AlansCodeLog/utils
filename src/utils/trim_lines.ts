/** @packageDocumentation @module utils */

/**
 * Trims lines at the start/end of the input.
 *
 * Can be used as a function or a template tag.
 *
 * Note that the last lines will also be trimmed if they only contain whitespace since you might often want to use this like this:
 *
 * ```ts
 * function some_func() {
 * 	let message = trim_lines(`
 * 		Some message....
 * 	`) // < gets trimmed even though it's \n\t
 * }
 * ```
 */
export function trim_lines(str: string): string {
	return str.replace(/(^\n*?(?=[^\n]|$))([\s\S]*?)(\n*?\s*?$)/, "$2")
}
