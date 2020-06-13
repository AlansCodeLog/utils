/** @packageDocumentation @module utils */
import util from "util"

/**
 * Nodejs only wrapper around `util.inspect` to console log objects 10 levels deep by default, with colors, and `breakLength` set to the terminal width.
 *
 * @env nodejs
 */
export function inspect(obj: any, depth: number = 10): void {
	// not sure why, but if we don't add 9, it always breaks 9 characters before it should
	// I thought maybe it was the ansi colors, but it happens regardless of whether colors is true or not
	// eslint-disable-next-line @typescript-eslint/naming-convention
	let breakLength = process.stdout.columns + 9
	// eslint-disable-next-line no-console
	console.log(util.inspect(obj, { depth, colors: true, breakLength }))
}
