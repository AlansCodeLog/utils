/**
 * Returns true if an array is empty.
 *
 * Allows typescript to understand the array is empty when used in an if statement:
 *
 * ```ts
 * const arr = []
 * if (isEmpty(arr)) {
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
 * const obj = {a:"a"}
 * if (isEmpty(keys(obj))) {
 * 	// obj is still {a: string}
 * } else {
 * 	// obj is {a: string}
 * }
 * ```
 *
 * More examples of how this behaves with different array types:
 *
 * ```ts
 * const arr: any[] = [] // implicit any[]
 * if (isEmpty(arr)) arr // []
 * else arr // any[]
 *
 * const arr = ["A"]
 * if (isEmpty(arr)) arr // []
 * else arr // string[]
 *
 * const arr: [] = []
 * //       ^ required for non-const arrays
 * if (isEmpty(arr)) arr // []
 * else arr // never
 *
 * const arr: ["A"] = ["A"]
 * //       ^ required for non-const arrays
 * if (isEmpty(arr)) arr // never
 * else arr // ["A"]
 *
 * const arr = [] as const
 * if (isEmpty(arr)) arr // readonly []
 * else arr // never
 *
 * const arr = ["A"] as const
 * if (isEmpty(arr)) arr // never
 * else arr // readonly ["A"]
 * ```
 */

// This could have been written to take in both arrays and objects but it's not possible to write it's return type correctly for both at the same time(i.e.value is {} doesn't work and we can't do value is[] only for arrays and return a boolean otherwise because the syntax isn't allowed).
export function isEmpty<
	T extends
		any[] | readonly any[] =
		any[] | readonly any[],
>(value: T | [] | readonly [],
): value is (T extends any[] ? [] : readonly []) {
	return value.length === 0
}

