/** @packageDocumentation @module types */
/** @packageDocumentation @module types */
/** Like `Partial<T>` but deep. */
export type DeepPartial<T> = {
	[P in keyof T]?:
	T[P] extends (infer U)[]
		? DeepPartial<U>[]
		: T[P] extends object
		? DeepPartial<T[P]>
		: T[P]
}
