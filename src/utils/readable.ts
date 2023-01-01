import { keys } from "retypes/keys.js"
import { isEmpty } from "utils/isEmpty.js"
/**
 * Returns an array in human readable format (with an oxford comma if there are 3 or more elements).
 *
 * By default nested arrays and objects are turned into: `[...]`, `{...}`, `[]` or `{}` depending on if they're empty or not. Functions are turned into `[name] function` or `anonymous function` if they have no name. Class instances are turned into `[name] instance`. Classes themselves can't be differentiated from functions so the function format is used.
 *
 * If you need some custom behavior for some elements, see the stringify option.
 *
 * ```ts
 * readable(["a"]) // a
 * readable(["a", "b"]) // a and b
 * readable(["a", "b", "c"]) // a, b, and b
 * readable(["a", "b", [b], {c: "c"}, [], {}]) // a, b, [...], {...}, [] and {}
 * ```
 */
export function readable(
	arr: any[],
	{ conjunction = "and", stringify }:
	{
		/** How to join the last two elements. */
		conjunction?: string
		/**
		 * Optional function to control how elements are stringified. You are free to still return objects, etc. from this function and only stringify what you need. The returned values will still be passed through the default stringify function.
		 *
		 * ```ts
		 * readable(["a", "b", new Animal()], {stringify: (el) => el instance of Animal ? "Animal" : el}) // a, b, and Animal
		 * ```
		 */
		stringify?: (el: any) => any
	} = {}
): string {
	const stringifier = (el: any): string => defaultStringify(stringify ? stringify(el) : el)
	if (arr.length <= 1) {
		return arr.map(stringifier).join("")
	} else {
		const beginning = arr
			.slice(0, arr.length - 1)
			.map(stringifier)
			.join(", ")
		const end = stringifier(arr[arr.length - 1])
		const oxfordComma = arr.length === 2 ? "" : ","
		return `${beginning}${oxfordComma} ${conjunction} ${end}`
	}
}

function defaultStringify(val: any): string {
	if (Array.isArray(val)) return isEmpty(val) ? "[]" : "[...]"
	if (typeof val === "object" && val !== null) {
		if (val.constructor?.name !== "Object") return `${val.constructor.name} instance`
		return isEmpty(keys(val)) ? "{}" : "{...}"
	}
	if (typeof val === "function") return val.name === "" ? "anonymous function" : `${val.name} function`
	return val?.toString ? val.toString() : val
}
