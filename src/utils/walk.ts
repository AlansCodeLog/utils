import { keys } from "./keys.js"


/**
 * Recursively walks through an object or array (and also technically `null` too if you force it).
 *
 * ```ts
 * walk(obj, (val, keypathArr) => { ... })
 * ````
 * Save can used to save the return of the callback (if no callback is given it just returns the value), and deep clone objects.
 * ```ts
 * const deepClone = walk(obj, undefined, {save:true})
 * ```
 * As well as more complicated operations that can preserve certain keys (such as in the case of Error instances or other such objects.)
 * ```ts
 * const seen = {}
 *
 * walk(obj, (val, keypath) => {
 * 	if (typeof val === "object") { // we're in before or after
 * 		const key = keypath.join(".")]
 * 		if (val instanceof ObjectWeWantToPreserve) { // e.g. Error
 * 			seen[key] = val
 *				// return dummy empty value to avoid looping over the value
 * 			// note this needs to return []/{}/null
 * 			// we use {} because we catch it in the same condition above
 * 			return {}
 * 		}
 * 		if (seen[key]) { // we're in after
 * 			// re-assign value we want to keep
 * 			return seen[key]
 * 		}
 * 	}
 * )
 * }, {before: true, after: true, save: true})
 *
 * ```
 * In the above scenerio, if not using save and we just want to modify the object directly, we could just keep the list of keypaths + values to modify and only use `{before:true}`, then loop and mutate those keys using {@link set}.
 */
export function walk<
	TSave extends true | false = false,
	TRes extends
		TSave extends true ? any : undefined =
		TSave extends true ? any : undefined,
>(
	obj: any | any[],
	walker?: (el: any, keyPath: string[]) => undefined | any,
	opts: {
		/** If true, will "save" the result of the walker, allowing it to be used for deep map/cloning of objects. By "save" we mean, the return value of the walker will be assigned to the property (if it does not return undefined) and walk will return the modified clone. Using save will change the return type to any since otherwise it is impossible to type. You can use the second type parameter to set it manually.*/
		save?: TSave
		/** If true, run walker on the value before attempting to loop through it's keys. If save is true, this can be used to modify the object that will be looped over. */
		before?: boolean
		/** If true, run walker on the value after attempting to loop through it's keys. If save is true, this can be used to modify the final value. */
		after?: boolean
	} = {},
): TRes {
	// eslint-disable-next-line prefer-rest-params
	const keyPath = [...(arguments[3] ?? [])] as string[] // private parameter
	if (opts.before) {
		const walkerRes = walker ? walker(obj, keyPath) : obj
		if (opts.save) obj = walkerRes
	}
	let res
	if (Array.isArray(obj)) {
		const items = []
		let i = 0
		for (const item of obj) {
			const thisKeyPath = [...keyPath, i.toString()]
			const walkRes = typeof item === "object" && item !== null
				// @ts-expect-error - passing private arg
				? walk(item, walker, opts, thisKeyPath)
				: walker ? walker(item, thisKeyPath) : item
			if (opts.save && walkRes !== undefined) items.push(walkRes)
			i++
		}

		res = opts.save ? items : undefined as any
	} else if (obj !== null) {
		const items: any = {}
		for (const key of keys(obj)) {
			const thisKeyPath = [...keyPath, key.toString()]
			const item = obj[key]
			const walkRes = typeof item === "object" && item !== null
				// @ts-expect-error - passing private arg
				? walk(item, walker, opts, thisKeyPath)
				: walker ? walker(item, thisKeyPath) : item

			if (opts.save && walkRes !== undefined) items[key] = walkRes
		}
		res = opts.save ? items : undefined as any
	} else if (obj === null) {
		const walkRes = walker ? walker(obj, keyPath) : obj
		res = opts.save ? walkRes : undefined as any
	}
	if (opts.after) {
		const walkerRes = walker ? walker(res, keyPath) : res
		if (opts.save) res = walkerRes
	}

	return res
}
