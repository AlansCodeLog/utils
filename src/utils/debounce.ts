import { castType } from "./castType.js"

import { getQueueKey } from "../internal/getQueueKey.js"
import type { AnyFunction, AnyPromise, Debounced, DebounceQueue } from "../types/index.js"


/**
 * Returns a debounced function.
 *
 * Has all the typical options (e.g. trailing, leading) for a debounce function and the ability to cancel/flush the debounced funciton.
 *
 * ```ts
 *
 * const callback = () => {}
 * const debounced = debounce(callback, 1000)
 *
 * debounced.cancel() // clear all timeouts
 * debounced.flush() // if there's a pending funciton, call it then cancel
 * ```
 *
 * AND it can also create debounced queues.
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
 * const sharedQueue = {}
 * const save = debounce(_save, 1000, {
 * 	queues: sharedQueue
 * })
 * const remove = debounce(_remove, 1000, {
 * 	queues: sharedQueue
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
 * const save = debounce(_save, 1000)
 * // equivalent of debounce(_save, 1000, {index: 0})
 * ```
 *
 * If you need to debounce based on something more complicated (a property of an argument or multiple arguments) index can be a function that returns the key to use.
 *
 * ```ts
 * const save = debounce(_save, 1000, {
 * 	index: (arguments) => {
 * 		// multiple arguments
 * 		return arguments[0] + arguments[2]
 * 		// some key of the arguments
 * 		return arguments[0].someProperty
 * 	}
 * })
 * ```
 *
 * # Promisified Debounce
 *
 * The function also supports wrapping async by passing `{promisify: true}`. We must tell the function whether to promisify since [we can't/shouldn't deferentiate between regular and async function](https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async).
 *
 * When promisify is enabled, when the funciton is debounced, the callback will be called with `Error("Debounced")` as the first param. This is so that when awaiting you can tell whether the result is a real result, or just the debounce.
 *
 * You can check what type of result it is with the {@link isDebouncedResult} utilty funciton.
 *
 * ```ts
 * const callback = (maybeArg) => {
 * 	// change what is returned when the funciton is debounced, if needed
 * 	if (isDebouncedResult(maybeArg)) return maybeArg
 * 	// do stuff
 * 	if (!ok) throw new Error("Custom Error")
 * }
 * const debounced = debounce(callback, 1000, { promisify: true })
 * const res = await debounced().catch(err => {
 * 	// if needed errors from the callback can be caught here
 * })
 *
 * if (!isDebouncedResult(res)) {
 * 	// ...
 * }
 * ```
 *
 * @param callback The function to debounce.
 *
 * @param wait How long to wait before calling the function after the last call. Defaults to 0
 */
// #awaiting https://github.com/TypeStrong/typedoc/pull/621 + various variations of the same issue for vscode
export function debounce<
	T extends
		AnyFunction | AnyPromise =
		AnyFunction | AnyPromise,
	TQueued extends
		boolean | DebounceQueue =
	boolean | DebounceQueue,
	TPromisify extends boolean = boolean,
>(callback: T, wait: number = 0,
	{
		queue = false as TQueued,
		index = (queue ? 0 : undefined) as any,
		leading = false,
		trailing = true,
		promisify = false as TPromisify,
	}: {
		/** Whether to use queues, or a queues object to use. */
		queue?: TQueued | DebounceQueue
		/** The index number of the argument that will be used as the key to the queues if queues are enabled. */
		index?: TQueued extends true
			? number | ((...args: Parameters<T>) => number)
			: undefined
			/** Whether the first call is called immediately, and all subsequent calls ignored, defaults to false. Note that if trailing and leading are both set to true, trailing will only fire if there were multiple calls before the wait period timed out. */
		leading?: boolean
		/** Whether the call is delayed until the end of the timeout. Defaults to true. */
		trailing?: boolean
		/** Whether to promisify the debounced function.*/
		promisify?: TPromisify
	} = {}
): Debounced<T, TPromisify> {
	// eslint-disable-next-line prefer-rest-params
	const isThrottle = arguments[3] ?? false
	let queues: DebounceQueue = {}
	if (typeof queue === "object") queues = queue

	const type = queue
		? typeof index as "function" | "number" | "undefined"
		: "undefined"

	let debounced
	if (promisify) {
		debounced = function async(...args: any[]): any {
			castType<AnyPromise>(callback)
			const key: keyof DebounceQueue = getQueueKey(type, index, args)

			const timerFunc = (): void => {
				if (trailing && queues[key]?._args && queues[key]?.resolve) {
					queues[key]?.resolve()
					return // entry deleted by resolve
				}
				delete queues[key]
			}

			queues[key] ??= {} as any
			if (queues[key]?.timeout !== undefined || !leading) {
				queues[key]._args = args
				if (isThrottle) {
					queues[key].timeout ??= setTimeout(timerFunc, wait)
				} else if (queues[key]?.timeout) {
					if (queues[key]?.reject) {
						queues[key]?.reject()
						delete queues[key]?.resolve
						delete queues[key]?.reject
					}

					clearTimeout(queues[key].timeout)
				}
			}
			if (!isThrottle) {
				queues[key].timeout = setTimeout(timerFunc, wait)
			}
			return new Promise<void>((resolve, reject) => {
				if (queues[key]?.timeout === undefined && leading) {
					queues[key].resolve()
					delete queues[key]?.resolve
					delete queues[key]?.reject
					if (isThrottle) {
						queues[key].timeout = setTimeout(timerFunc, wait)
					}
				}
				queues[key].resolve = resolve
				queues[key].reject = reject
			}).then(async () => {
				// eslint-disable-next-line @typescript-eslint/no-shadow
				const args = queues[key]._args
				delete queues[key]
				return callback(...args)
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			}).catch(async () => callback(debounceError))
		}
	} else {
		// this is a "fake" parameter, all the arguments are still in args
		// see https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters
		debounced = function(this: any, ...args: any[]): void {
			castType<AnyFunction>(callback)
			const context = this

			const key: keyof DebounceQueue = getQueueKey(type, index, args)


			const timerFunc = (): void => {
				if (trailing && queues[key]?._args) {
					callback.apply(queues[key]._context, queues[key]._args)
				}
				delete queues[key]
			}

			queues[key] ||= {} as any
			if (queues[key]?.timeout === undefined && leading) {
				callback.apply(context, args)
				if (isThrottle) {
					queues[key].timeout = setTimeout(timerFunc, wait)
				}
			} else {
				queues[key]._context = context
				queues[key]._args = args
				if (isThrottle) {
					queues[key].timeout ??= setTimeout(timerFunc, wait)
				} else if (queues[key]?.timeout) {
					clearTimeout(queues[key].timeout)
				}
			}
			if (!isThrottle) queues[key].timeout = setTimeout(timerFunc, wait)
		}
	}
	const cancel = (key: any = ""): void => {
		if (queues[key].timeout) clearTimeout(queues[key].timeout)
		delete queues[key]
	}
	const flush = (key: any = ""): void => {
		if (trailing && queues[key]?._args) {
			castType<AnyFunction>(callback)
			callback.apply(queues[key]?._context, queues[key]._args)
		}
		cancel(key)
	}
	// @ts-expect-error .
	debounced.cancel = cancel
	// @ts-expect-error .
	debounced.flush = flush
	return debounced as any
}
/** @internal */
// use single frozen instance since this might be getting created quite a lot
export const debounceError = Object.freeze(new Error("Debounced"))
