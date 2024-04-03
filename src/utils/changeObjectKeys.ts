import { keys } from "./keys.js"

/**
 * Returns a new object with the given function applied to it's keys (shallow).
 * Useful for renaming keys or doing some custom modification.
 *
 * ```ts
 * import { constantCase } from "change-case"
 *
 * const obj = { helloWorld: "hello" }
 * const newObj = changeObjKeys(obj, constantCase)
 * // newObject = { HELLO_WORLD: "hello" }
 *
 * // newObj must be typed manually
 * const newObj = changeObjKeys<ResType>(obj, constantCase)
 * ```
 */
export function changeObjKeys<
	TResObj extends Record<any, any>,
	TObj extends Record<any, any>,
>(
	obj: TObj,
	changeKey:((key: keyof TObj) => string | number | symbol)
): TResObj {
	const res: any = {}
	for (const key of keys(obj)) {
		res[changeKey(key)] = obj[key]
	}
	return res as TResObj
}
