/** @packageDocumentation @module utils */

import { walk } from "./walk"

/**
 * Pretty prints objects with tab indentation, or optionally all in a single line with a space between elements (e.g. for arrays) by passing `{ oneline: true }`.
 *
 * The stringifying is left up to javascript's JSON.stringify method by default but note it ignores/removes functions and symbols.
 *
 * You can also pass `{ stringify: true }` if you also need these stringified. It will call use `.toString()` on functions and symbols. Note this still does not stringify things like Sets "correctly".
 *
 * Or you can pass a custom stringify function. If you return undefined the value is skipped. This function will be passed all the object's values. If a value is an object, it's passed all that value's values then the value itself (i.e. it's using {@link walk} with `{ after: true }`)
 *
 * Note that if your stringify function returns values with newlines these are preserved when using the oneline option.
 *
 */
export function pretty(obj: object,
	{ oneline = false, stringify = false }:
	{ oneline?: boolean, stringify?: boolean | ((el: any) => undefined | string) } = {}
): string {
	let obj_clone = obj
	if (stringify) {
		if (stringify === true) {
			stringify = val =>
				typeof val === "function" || typeof val === "symbol"
					? val.toString()
					: val
		}

		obj_clone = walk(obj, stringify, { save: true, after: true })
	}
	return oneline
		// | would never appear at the start of any JSON stringified object line afaik
		? JSON.stringify(obj_clone, null, "|").replace(/\n\|*/g, " ")
		: JSON.stringify(obj_clone, null, "\t")
}

