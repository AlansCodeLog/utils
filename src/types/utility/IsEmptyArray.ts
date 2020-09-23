/** @packageDocumentation @module types */

import type { EmptyArray } from "./EmptyArray"
import type { NonEmptyArray } from "./NonEmptyArray"

/**
 * Returns true if we can be sure the array is empty, false if we can be sure it's not, and boolean otherwise.
 *
 * ```ts
 * let arr = []
 * type res = IsEmptyArray<typeof arr> // boolean
 *
 * let arr = ["A"]
 * type res = IsEmptyArray<typeof arr> // boolean
 *
 * let arr = [] as const // or
 * let arr: [] = []
 * type res = IsEmptyArray<typeof arr> // true
 *
 * let arr = ["A"] as const // or
 * let arr: ["A"] = ["A"]
 * type res = IsEmptyArray<typeof arr> // false
 * ```
 */
export type IsEmptyArray<T> =
	T extends EmptyArray
	? true
	: T extends NonEmptyArray
	? false
	: boolean
