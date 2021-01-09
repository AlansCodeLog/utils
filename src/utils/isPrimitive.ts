import type { AnyFunction } from "@/types"

/** Returns if the value is a primitive (i.e. string, number, boolean, null, undefined, or a function/class definition). */
export function isPrimitive<T extends string | number | boolean | null | undefined | AnyFunction>(value: T | any): value is T {
	return typeof value !== "object" || value === null || value === undefined
}
