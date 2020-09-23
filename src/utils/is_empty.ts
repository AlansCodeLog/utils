/** @packageDocumentation @module utils */
/**
 * Returns true if an array is empty.
 *
 * Allows typescript to understand the array is empty when used in an if statement:
 *
 * ```ts
 * let arr = []
 * if (is_empty(arr)) {
 * 	// arr is []
 * } else {
 * 	// arr is any[]
 * }
 * // more examples below
 * ```
 *
 * Also useful for objects, but there is no way to get typescript to understand the object is empty.
 *
 * ```ts
 * let obj = {a:"a"}
 * if (is_empty(keys(obj))) {
 * 	// obj is still {a: string}
 * } else {
 * 	// obj is {a: string}
 * }
 * ```
 *
 * More examples of how this behaves with different array types:
 *
 * ```ts
 * let arr: any[] = [] // implicit any[]
 * if (is_empty(arr)) arr // []
 * else arr // any[]
 *
 * let arr = ["A"]
 * if (is_empty(arr)) arr // []
 * else arr // string[]
 *
 * let arr: [] = []
 * //       ^ required for non-const arrays
 * if (is_empty(arr)) arr // []
 * else arr // never
 *
 * let arr: ["A"] = ["A"]
 * //       ^ required for non-const arrays
 * if (is_empty(arr)) arr // never
 * else arr // ["A"]
 *
 * let arr = [] as const
 * if (is_empty(arr)) arr // readonly []
 * else arr // never
 *
 * let arr = ["A"] as const
 * if (is_empty(arr)) arr // never
 * else arr // readonly ["A"]
 * ```
 */

// This could have been written to take in both arrays and objects but it's not possible to write it's return type correctly for both at the same time(i.e.value is {} doesn't work and we can't do value is[] only for arrays and return a boolean otherwise because the syntax isn't allowed).
export function is_empty<
	T extends
		any[] | readonly any[] =
		any[] | readonly any[],
>(value: T | [] | readonly [],
): value is (T extends any[] ? [] : readonly []) {
	return value.length === 0
}

