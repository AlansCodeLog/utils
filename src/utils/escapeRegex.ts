/**
 * Escapes unknown text so it can be used to create a `RegExp`.
 * [source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping)
 * ```ts
 * const str = "some/path/"
 * const escaped = escapeRegex(str) // some\/path\/
 * const regex = new RegExp(`${escaped}.*?\/`)
 * ```
 */
export function escapeRegex(str: string): string {
	return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
}
