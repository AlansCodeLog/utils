/**
 * Like extract, but extracts the keys of an object by the type of the value.
 *
 * This is useful, for example, when we have a function that can only handle x type of values but is passed a key to access that type.
 * For example:
 * ```ts
 * type Example = {
 * 	a: string
 * 	b: number
 * 	c: boolean
 * }
 * type ExampleStrings = ExtractByValue<Example, string> // "a"
 *
 * const extractStrings = <T>(val: T, key: ExtractByValue<T, string[]>) => val[key].sort(...).map(...)
 * ```
 */
export type ExtractByValue<TObj, TValType> = {
	[K in keyof TObj]: TObj[K] extends TValType
	? K
	: never
}[keyof TObj]

