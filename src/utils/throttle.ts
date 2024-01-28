import type { AddParameters, AnyFunction, AnyPromise, Throttled, ThrottleQueue } from "../types/index.js"

import { debounce } from "./debounce.js"


/**
 * Returns a throttled function.
 *
 * Has all the same options (including debounce queues) as {@link debounce}.
 *
 * @param callback The function to throttle.
 *
 * @param wait How long to wait before calling the function can be called again. Defaults to 50
 */
// #awaiting https://github.com/TypeStrong/typedoc/pull/621 + various variations of the same issue for vscode
export function throttle<
	T extends
		AnyFunction | AnyPromise=
		AnyFunction | AnyPromise,
	TQueued extends
		boolean | ThrottleQueue =
		boolean | ThrottleQueue,
	TPromisify extends boolean = boolean,
>(callback: T, wait: number = 0,
	{
		queue = false as TQueued,
		index = (queue ? 0 : undefined) as any,
		leading = true,
		trailing = true,
	}: {
		/** Whether to use queues, or a queues object to use. */
		queue?: TQueued | ThrottleQueue
		/** The index number of the argument that will be used as the key to the queues if queues are enabled. */
		index?: TQueued extends true
			? number | ((...args: Parameters<T>) => number)
			: undefined
		/**
		 * Whether the first call is called immediately. Note that if trailing and leading are both set to true, trailing will only fire if there were multiple calls.
		 *
		 * Defaults to true.
		 */
		leading?: boolean
		/** Whether the call is delayed until the end of the timeout. Defaults to true. */
		trailing?: boolean
		/** Whether to promisify the throttled function.*/
		promisify?: TPromisify
	} = {}
): Throttled<T> {
	return (debounce as AddParameters<typeof debounce, [boolean]>)(callback, wait, { queue, index, leading, trailing }, true)
}
