/** @packageDocumentation @module utils */

import { keys } from "@/retypes"

/**
 * Recursively walks through an object or array (and also technically `null` too if you force it).
 *
 * You can use it as a sort of deep map/clone for objects by passing `{ save: true }`, in which case the return value of the walker will be assigned to the property (if it does not return undefined) and walk will return the modified clone. Since the return type is impossible to type, it returns any when using `{ save: true }`. You can use the second type parameter to set it manually.
 *
 * You can also run the walker on objects or arrays by passing either `{ before: true }` (run it before looping through the keys) or `{ after: true }` (run it after looping through the keys) or both. This will skip the first run (e.g. the walker will not be passed the object itself.)
 */
export function walk<
	TSave extends true | false = false,
	TRes extends
		TSave extends true ? any : undefined =
		TSave extends true ? any : undefined,
>(
	obj: any | any[],
	walker: (el: any) => undefined | any,
	{
		save = false as TSave,
		before = false,
		after = false,
	}:
	{
		save?: TSave
		before?: boolean
		after?: boolean
	} = {},
): TRes {
	// eslint-disable-next-line prefer-rest-params
	let is_recursive_call = arguments[3] as boolean || false // private parameter
	// eslint-disable-next-line prefer-rest-params
	let opts = arguments[2] // minor optimization to re-use the options object

	if (is_recursive_call && before) obj = walker(obj)
	let res
	if (Array.isArray(obj)) {
		let items = []
		for (let item of obj) {
			res = typeof item === "object" && item !== null
				// @ts-expect-error - passing private arg
				? walk(item, walker, opts, true)
				: walker(item)
			if (save && res !== undefined) items.push(res)
		}
		res = save ? items : undefined as any
	} else if (obj !== null) {
		let items: any = {}
		for (let key of keys(obj)) {
			let item = obj[key]
			res = typeof item === "object" && item !== null
				// @ts-expect-error - passing private arg
				? walk(item, walker, opts, true)
				: walker(item)

			if (save && res !== undefined) items[key] = res
		}
		res = save ? items : undefined as any
	} else if (obj === null) {
		res = walker(obj)
		res = save ? res : undefined as any
	}

	if (is_recursive_call && after) return walker(res)

	return res
}
