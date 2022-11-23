import { walk } from "./walk.js"

/**
 * Pretty prints objects with tab indentation, or optionally all in a single line with a space between elements (e.g. for arrays) (see `oneline` option).
 *
 * Note that if your stringify function returns values with newlines these are preserved when using the oneline option.
 *
 */
export function pretty(obj: object,
	{ oneline = false, stringify = false }:
	{
		/** If true, does not use tabs, prints all in one line. Useful for prettifying arrays */
		oneline?: boolean
		/**
		 * The default is false, which will just leave the stringifying up to JSON.stringify (which will remove functions and symbols). If you need them you can pass `true` instead, in which case, it will use `.toString()` on them. Note this still does not stringify things like Sets "correctly".
		 *
		 * Otherwise, you can either pass a custom stringify function to completely customize the behavior.
		 *
		 * If the function returns undefined the value is skipped. This function will be passed all the object's values. If a value is an object, it's passed all that value's values then the value itself (i.e. it's using {@link walk} with `{ after: true }`)
		 *
		 * If it returns values with newlines note these are preserved when using the oneline option.
		 */
		stringify?: boolean | ((el: any) => undefined | string)
	} = {}
): string {
	let objClone = obj
	if (stringify) {
		if (stringify === true) {
			stringify = val =>
				typeof val === "function" || typeof val === "symbol"
					? val.toString()
					: val
		}

		objClone = walk(obj, stringify, { save: true, after: true })
	}
	return oneline
		// | would never appear at the start of any JSON stringified object line afaik
		? JSON.stringify(objClone, null, "|").replace(/\n\|*/g, " ")
		: JSON.stringify(objClone, null, "\t")
}

