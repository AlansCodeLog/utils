/** @packageDocumentation @module types */

/** Like `Required` but deep. */
export type DeepRequired<T> = {
	[P in keyof T]-?:
	T[P] extends (infer U)[]
	? DeepRequired<U>[]
	: T[P] extends object
	? DeepRequired<T[P]>
	: T[P]
}
