import { keys } from "./keys.js"


/**
 * Recursively walks through an object or array (and also technically `null` too if you force it).
 */
export function walk<
	TSave extends true | false = false,
	TRes extends
		TSave extends true ? any : undefined =
		TSave extends true ? any : undefined,
>(
	obj: any | any[],
	walker: (el: any, keyPath: string[]) => undefined | any,
	{
		save = false as TSave,
		before = false,
		after = false,
	}: {
		/** If true, will "save" the result of the walker, allowing it to be used for deep map/cloning of objects. By "save" we mean, the return value of the walker will be assigned to the property (if it does not return undefined) and walk will return the modified clone. Using save will change the return type to any since otherwise it is impossible to type. You can use the second type parameter to set it manually.*/
		save?: TSave
		/** If true, run walker on object/array before looping through it's keys. */
		before?: boolean
		/** If true, run walker on object/array after looping through it's keys. This will skip the first run (e.g. the walker will not be passed the object itself.) */
		after?: boolean
	} = {},
): TRes {
	// eslint-disable-next-line prefer-rest-params
	const isRecursiveCall = arguments[4] as boolean ?? false // private parameter
	// eslint-disable-next-line prefer-rest-params
	const keyPath = [...(arguments[3] ?? [])] as string[] // private parameter
	const opts = { save, before, after }
	if (isRecursiveCall && before) obj = walker(obj, keyPath)
	let res
	if (Array.isArray(obj)) {
		const items = []
		let i = 0
		for (const item of obj) {
			const thisKeyPath = [...keyPath, i.toString()]
			res = typeof item === "object" && item !== null
				// @ts-expect-error - passing private arg
				? walk(item, walker, opts, thisKeyPath, true)
				: walker(item, thisKeyPath)
			if (save && res !== undefined) items.push(res)
			i++
		}
		res = save ? items : undefined as any
	} else if (obj !== null) {
		const items: any = {}
		for (const key of keys(obj)) {
			const thisKeyPath = [...keyPath, key.toString()]
			const item = obj[key]
			res = typeof item === "object" && item !== null
				// @ts-expect-error - passing private arg
				? walk(item, walker, opts, thisKeyPath, true)
				: walker(item, thisKeyPath)

			if (save && res !== undefined) items[key] = res
		}
		res = save ? items : undefined as any
	} else if (obj === null) {
		res = walker(obj, keyPath)
		res = save ? res : undefined as any
	}

	if (isRecursiveCall && after) return walker(res, keyPath)

	return res
}
