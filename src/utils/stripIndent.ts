import { isDefined } from "./isDefined.js"

/**
 * Trims extra indents from a string.
 */
export function stripIndent(
	str: string,
	{
		tabs = true,
		count = undefined,
	}: {
		/** Whether to unindent based on tabs (default) or spaces. */
		tabs?: boolean
		/** Remove a specific amount of indents (works like unindenting in editors). Pass `Infinity` to remove all indents. */
		count?: number | typeof Infinity
	} = {},
): string {
	let min: number | undefined = count

	if (!isDefined(min)) {
		const unknownAmountOfTabs = tabs
			? /^[\t]*(?=[^\t])/gm
			: /^[ ]*(?=[^ ])/gm
		const indent = str.match(unknownAmountOfTabs)
		if (indent === null) return str

		min = indent.reduce((prev, curr) => Math.min(prev, curr.length), Infinity)
	}
	const limit = min === Infinity ? "" : min

	const knownAmountOfTabs = new RegExp(`^${(tabs ? "\\t" : " ")}{0,${limit}}`, "gm")
	return str.replace(knownAmountOfTabs, "")
}

