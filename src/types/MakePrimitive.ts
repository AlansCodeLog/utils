/**
 * Converts a literal type back to a "primitive" (i.e. collective type).
 *
 * ```ts
 * type Keys = "a" | "b" | "c"
 * type KeysType = MakePrimitive<keys> // string
 * ```
 *
 * Can optionally ignore booleans by passing false to the second type parameter.
 */
export type MakePrimitive<T, TIgnoreBooleans extends boolean = false> =
	T extends string
	? string
	: T extends number
	? number
	: T extends symbol
	? symbol
	: T extends boolean
	? (TIgnoreBooleans extends true
		? T
		: T extends true
		? boolean
		: T extends false
		? boolean
		: never
	)
	: never
