/** @packageDocumentation @module utils */

import { keys } from "@/retypes"
import { is_empty } from "@/utils"
/**
 * Returns an array in human readable format (with an oxford comma if there are 3 or more elements).
 *
 * By default nested arrays and objects are turned into: `[...]`, `{...}`, `[]` or `{}` depending on if they're empty or not. Functions are turned into `[name] function` or `anonymous function` if they have no name. Class instances are turned into `[name] instance`. Classes themselves can't be differentiated from functions so the function format is used.
 *
 * If you need some custom behavior for some elements you can pass a `stringify` function. You are free to still return objects, etc. from this function and only stringify what you need. The returned values will still be passed through the default stringify function.
 *
 * ```ts
 * readable(["a"]) // a
 * readable(["a", "b"]) // a and b
 * readable(["a", "b", "c"]) // a, b, and b
 * readable(["a", "b", [b], {c: "c"}, [], {}]) // a, b, [...], {...}, [] and {}
 * readable(["a", "b", new Animal()], {stringify: (el) => el instance of Animal ? "Animal" : el}) // a, b, and Animal
 * ```
 */
export function readable(
	arr: any[],
	{ conjunction = "and", stringify }:
	{ conjunction?: string, stringify?: (el: any) => any } = { }
): string {
	let stringifier = (el: any): string => default_stringify(stringify ? stringify(el) : el)
	if (arr.length <= 1) {
		return arr.map(stringifier).join("")
	} else {
		let beginning = arr
			.slice(0, arr.length - 1)
			.map(stringifier)
			.join(", ")
		let end = stringifier(arr[arr.length - 1])
		let oxford_comma = arr.length === 2 ? "" : ","
		return `${beginning}${oxford_comma} ${conjunction} ${end}`
	}
}

function default_stringify(val: any): string {
	if (Array.isArray(val)) return is_empty(val) ? "[]" : "[...]"
	if (typeof val === "object" && val !== null) {
		if (val.constructor && val.constructor.name !== "Object") return `${val.constructor.name} instance`
		return is_empty(keys(val)) ? "{}" : "{...}"
	}
	if (typeof val === "function") return val.name === "" ? "anonymous function" : `${val.name} function`
	return val?.toString ? val.toString() : val
}
