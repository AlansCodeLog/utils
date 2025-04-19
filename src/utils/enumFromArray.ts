/**
 * Creates a "string" enum from an array of strings.
 *
 * Optionally prefixes the **values** with a string.
 *
 * There isn't an equivalent utility for numbers enums because it's not possible to automatically create the value type (e.g. 0, 1, 2) without a lot of crazy types.
 *
 * ```ts
 * const ERROR = errorEnumFromArray([
 * 	"SOME_ERROR",
 * 	"OTHER_ERROR"
 * ])
 * // ERROR = {
 * // 	SOME_ERROR: "SOME_ERROR",
 * // 	OTHER_ERROR: "OTHER_ERROR"
 * // }
 * const PREFIXED_ERROR = errorEnumFromArray([
 * 	"SOME_ERROR",
 * 	"OTHER_ERROR"
 * ], "PREFIX_")
 * // PREFIXED_ERROR = {
 * // 	SOME_ERROR: "PREFIX_SOME_ERROR",
 * // 	OTHER_ERROR: "PREFIX_OTHER_ERROR"
 * // }
 * ```
 */
export function enumFromArray<
	T extends string,
	TPrefix extends string = "",
>(arr: T[], prefix?: TPrefix): {
	[K in T]: `${TPrefix}${K}`
} {
	const res = {} as any
	for (const key of arr) {
		res[key] = prefix ? prefix + key : key
	}
	return res
}
