/**
 * Trims lines at the start/end of the input.
 *
 * Note that the last lines will also be trimmed if they only contain whitespace since you might often want to use this like this:
 *
 * ```ts
 * function someFunc() {
 * 	const message = trimLines(`
 * 		Some message....
 * 	`) // < gets trimmed even though it's \n\t
 * }
 * ```
 */
export function trimLines(str: string): string {
	return str.replace(/(^\n*?(?=[^\n]|$))([\s\S]*?)(\n*?\s*?$)/, "$2")
}
