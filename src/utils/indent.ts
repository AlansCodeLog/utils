/**
 * Indents the input string x tabs (except for the first line by default).
 *
 * Useful for pretty printing objects inside template strings (which is why `first = false` by default). The count should be set for the literal amount of strings the code is indented at.
 *
 * ```ts
 * const obj = {a:"a", b:"b", c:"c"}
 *
 * function someFunc() {
 * 	const message = format(`
 * 		Some message:
 * 		${indent(pretty(obj), 2)}
 * 	`)
 * ```
 * ```txt
 * 		^the code is indented 2 tabs, so that's what the count should be
 * Produces:
 * Some message:
 * {
 * 	a: "a",
 * 	b: "b",
 * 	c:"c"
 * }
 * ```
 * ```ts
 * 	const message2 = format(`
 * 		Some message:
 * 			${indent(pretty(obj), 2)}
 * 	`)
 * ```
 * ```txt
 * 			^the code is indented 3 tabs
 *  Produces:
 *  Some message:
 *  	{
 *  		a: "a",
 *  		b: "b",
 *  		c:"c"
 *  	}
 * ```
 */
export function indent(str: string, count: number = 0, { first = false }: { first?: boolean } = {}): string {
	const regex = first ? /(^|\n)/g : /\n/g
	const tabs = "\t".repeat(count)
	const replacement = first ? `$1${tabs}` : `\n${tabs}`
	return str.replace(regex, replacement)
}
