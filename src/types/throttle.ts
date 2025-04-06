import type { AnyFunction, AnyPromise, DebounceQueue } from "./index.js"


export type Throttled<
	T extends
		AnyFunction | AnyPromise =
		AnyFunction | AnyPromise,
	TPromisify extends boolean = boolean,
> = TPromisify extends true
	? (...args: Parameters<T>) => Promise<ReturnType<T>>
	: ((...args: Parameters<T>) => void)

export type ThrottleQueue = DebounceQueue
