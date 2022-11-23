import type { AnyFunction } from "./AnyFunction.js"

/**
 * Allows retyping of functions. Useful for calling functions with hidden parameters (for recursion).
 *
 * ```ts
 * function someFunc(someParam: string) {
 * 	const isRecursiveCall: boolean = arguments[1] ?? false
 * 	const self = someFunc as any as AddParameters<typeof someFunc, [typeof isRecursiveCall]>
 * 	// no error
 * 	self(someParam, true)
 * }
 * ```
 */
export type AddParameters<T extends AnyFunction, TExtra extends any[] = [boolean]> = (...args: [...Parameters<T>, ...TExtra]) => ReturnType<T>
