import type { EmptyArray } from "./EmptyArray"
import type { NonEmptyArray } from "./NonEmptyArray"

/**
 * Returns true if we can be sure the array is empty, false if we can be sure it's not, and boolean otherwise.
 *
 * ```ts
 * const arr = []
 * type res = IsEmptyArray<typeof arr> // boolean
 *
 * const arr = ["A"]
 * type res = IsEmptyArray<typeof arr> // boolean
 *
 * const arr = [] as const // or
 * const arr: [] = []
 * type res = IsEmptyArray<typeof arr> // true
 *
 * const arr = ["A"] as const // or
 * const arr: ["A"] = ["A"]
 * type res = IsEmptyArray<typeof arr> // false
 * ```
 */
export type IsEmptyArray<T> =
	T extends EmptyArray
	? true
	: T extends NonEmptyArray
	? false
	: boolean
