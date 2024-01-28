import { isPlainObject } from "./isPlainObject.js"
import { keys as keysOf } from "./keys.js"
import { pushIfNotIn } from "./pushIfNotIn.js"


/**
 * Like a deep spread of all the objects passed.
 *
 * Similar to {@link merge} but only plain objects are deep merged, everything else (including arrays) aren't. If the key exists in the base object it's overwritten.
 *
 * The first object is mutated so pass `{}` instead to avoid mutating it.
 *
 * ```ts
 *	override(base, config) // mutates base
 *	const merged = override({}, base, config) // mutates nothing
 * ```
 */
export function override<
	TBase extends
		Record<string, any> =
		Record<string, any>,
	TOthers extends
		(Record<string, any>)[] =
		(Record<string, any>)[],
	TOther extends TOthers[number] = TOthers[number],
>(
	base: TBase,
	...overrides: TOthers
): TBase & TOther {
	for (const other of overrides) {
		const obj: Record<string, any> = base
		const keys = pushIfNotIn(keysOf(obj), keysOf(other))
		for (const prop of keys) {
			const baseVal = obj[prop]
			const otherVal = other[prop]

			if (baseVal === undefined) {
				obj[prop] = otherVal
			} else if (isPlainObject(otherVal) && isPlainObject(baseVal)) {
				obj[prop] = override(baseVal, otherVal)
			} else if (otherVal !== undefined) {
				obj[prop] = otherVal
			}
		}
	}
	return base as TBase & TOther
}
