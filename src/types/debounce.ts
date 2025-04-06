import type { AnyFunction, AnyPromise, AnyTimer } from "./index.js"


export type Debounced<T extends AnyFunction | AnyPromise, TPromisify extends boolean = false> =
	TPromisify extends true
		? ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | false>)
		: ((...args: Parameters<T>) => void)

export type DebounceQueue = Record<string, {
	timeout?: AnyTimer
	/** @internal */
	_context: any
	/** @internal */
	_args: any[]
	resolve?: any
	reject?: any
}>

