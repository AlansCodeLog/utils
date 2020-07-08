/** @packageDocumentation @module types */

export type Keys<
	T extends Record<string | number | symbol, any>
> =
	T extends any[]
		? number[]
		: (keyof T)[]
