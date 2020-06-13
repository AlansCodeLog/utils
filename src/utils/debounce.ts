/** @packageDocumentation @module utils */

import type { AnyFunction } from "@/types"


type Debounced<T extends (...args: any) => any> = ((...args: Parameters<T>) => void)
// #todo not sure why eslint is complaining??? env.node is set to true
// eslint-disable-next-line no-undef
type DebounceQueue = Record<string, { leading?: boolean, timeout?: NodeJS.Timeout | number }>

/**
 * Returns a debounced function.
 *
 * Has all the typical options (e.g. trailing, leading) for a debounce function, but it can also create debounced queues.
 *
 * # Debounced Queues
 *
 * ## What are they?
 *
 * Queues allow you to avoid creating a debounce function for every instance that needs to debounce the same function.
 *
 * For example, say you want to debounce the saving of notes to a database until after a user stops typing. For each note open you would have to create a debounced version of the save function, and usually, when using frameworks, this would happen at the component level, not the store because the store save function is shared.
 *
 * Queues would allow you to avoid all that, and keep all the saving logic at the store level, allowing components to just call save normally.
 *
 * ## Options
 *
 * ### Queues
 *
 * To use queues, either pass `{ queues: true }` or `{ queues: {} }`. You can also have multiple debounced functions share a queue (e.g. save and delete):
 *
 * ```ts
 * let my_shared_queue = {}
 * let save = debounce(_save, 1000, {
 * 	queues: my_shared_queue
 * })
 * let remove = debounce(_remove, 1000, {
 * 	queues: my_shared_queue
 * })
 * ```
 *
 * ### Index
 *
 * Internally the queues object looks like this, where `key` is one of the arguments passed to the function (e.g. a note's id), by default the first, and it deletes the key after a function is finally called:
 *
 * ```ts
 * queues: {
 * 	[key]: {
 * 		// ... info needed internally
 * 	}
 * }
 * ```
 *
 * So the following would debounce the callback based on the id the function was called with:
 *
 * ```ts
 * function _save(id, some, other, arguments) {
 * 	//...
 * }
 * let save = debounce(_save, 1000)
 * // equivalent of debounce(_save, 1000, {index: 0})
 * ```
 *
 * If you need to debounce based on something more complicated (a property of an argument or multiple arguments) index can be a function that returns the key to use.
 * ```ts
 * let save = debounce(_save, 1000, {
 * 	index: (arguments) => {
 * 		// multiple arguments
 * 		return arguments[0] + arguments[2]
 * 		// some key of the arguments
 * 		return arguments[0].some_property
 * 	}
 * })
 * ```
 *
 * @param callback The function to debounce.
 *
 * @param wait How long to wait before calling the function after the last call. Defaults to 0
 *
 * @param options optional
 *
 * `options.queues` Whether to use queues, or queues object to use.
 *
 * `options.index` The index number of the argument that will be used as the key to the queues if queues are enabled.
 *
 * `options.trailing` Whether the call is delayed until the end of the timeout. Defaults to true.
 *
 * `options.leading` Whether the first call is called immediately, and all subsequent calls ignored, defaults to false. Note that if trailing and leading are both set to true, trailing will only fire if there were multiple calls before the wait period timed out.
 *
 * @returns {function} The debounced function.
 */
// #awaiting https://github.com/TypeStrong/typedoc/pull/621 + various variations of the same issue for vscode
export function debounce<
	T extends
		AnyFunction =
		AnyFunction,
	TQueued extends
		boolean | DebounceQueue =
		boolean | DebounceQueue
>(callback: T, wait: number = 0,
	{
		queue = false as TQueued,
		index = queue ? 0 : undefined,
		leading = false,
		trailing = true,
	}: {
		queue?: TQueued | DebounceQueue
		index?: TQueued extends true
			? number | ((...args: Parameters<T>) => number)
			: undefined
		leading?: boolean
		trailing?: boolean
	} = {}
): Debounced<T> {
	let queues: DebounceQueue = {}
	if (typeof queue === "object") queues = queue as DebounceQueue

	let type = queue
		? typeof index as "function" | "number" | "undefined"
		: undefined

	// this is a "fake" parameter, all the arguments are still in args
	// see https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters
	return function(this: any, ...args: any[]) {
		let context = this

		let key!: keyof DebounceQueue
		switch (type) {
			case "function":
				key = (index as AnyFunction)(args)
				break
			case "number":
				key = args[index as number]
				break
			case "undefined":
				key = "" // no key, singular debounce
				break
			default: break
		}

		if (queues[key]) {
			queues[key].leading = false
			clearTimeout(queues[key].timeout as number)
		} else {
			queues[key] = { leading: false }
			if (leading) {
				queues[key].leading = true
				callback.apply(context, args)
			}
		}

		queues[key].timeout = setTimeout(() => {
			let was_leading = queues[key]!.leading
			delete queues[key]
			if (was_leading) { return }
			if (!trailing) { return }

			callback.apply(context, args)
		}, wait)
	}
}
