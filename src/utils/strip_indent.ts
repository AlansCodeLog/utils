/** @packageDocumentation @module utils */

import { is_defined } from "./is_defined"

/**
 * Trims extra indents from a string.
 *
 * All indents can be forcefully removed by passing `{ count: Infinity }`.
 *
 * @param str
 * @param param1
 */
export function strip_indent(
	str: string,
	{
		tabs = true,
		count = undefined,
	}: {
		tabs?: boolean
		count?: number | typeof Infinity
	} = {}
): string {
	let min_indent: number | undefined = count

	if (!is_defined(min_indent)) {
		let unknown_amount_of_tabs = tabs
			? /^[\t]*(?=[^\t])/gm
			: /^[ ]*(?=[^ ])/gm
		let indent = str.match(unknown_amount_of_tabs)
		if (indent === null) return str

		min_indent = indent.reduce((prev, curr) => Math.min(prev, curr.length), Infinity)
	}
	let limit = min_indent === Infinity ? "" : min_indent

	let known_amount_of_tabs = new RegExp(`^${(tabs ? "\\t" : " ")}{0,${limit}}`, "gm")
	return str.replace(known_amount_of_tabs, "")
}

