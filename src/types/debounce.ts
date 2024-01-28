import type { AnyFunction, AnyPromise, AnyTimer } from "../types/index.js"


export type Debounced<T extends AnyFunction | AnyPromise, TPromisify extends boolean = false> =
	T extends AnyPromise
	? ((...args: Parameters<Awaited<T>>) => Promise<Awaited<ReturnType<T>> | false>)
	: T extends AnyFunction
	? TPromisify extends true ? ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | false>) : ((...args: Parameters<T>) => void)
	: undefined

export type DebounceQueue = Record<string, {
	timeout?: AnyTimer
	/** @internal */
	_context: any
	/** @internal */
	_args: any[]
	resolve?: any
	reject?: any
}>

