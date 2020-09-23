/** @packageDocumentation @module utils */

/**
 * Escapes unknown text so it can be used to create a `RegExp`. {@link source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping}
 * ```ts
 * let str = "some/path/"
 * let escaped = escape(str) // some\/path\/
 * let regex = new RegExp(`${escaped}.*?\/`)
 * ```
 * Note: There is already a built-in js function called escape, but it's deprecated, and I'm assuming if you're using it, then you know about it and would understand this might conflict with it depending on how you're packaging your code.
 */
export function escape(str: string): string {
	return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
}
