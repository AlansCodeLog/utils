/** @packageDocumentation @module utils */

import { is_plain_object } from "./is_plain_object"
import { push_if_not_in } from "./push_if_not_in"

import { keys as keys_of } from "@/retypes"


/**
 * Like a deep spread of all the objects passed.
 *
 * Similar to {@link merge} but only plain objects are deep merged, everything else (including arrays) aren't. If the key exists in the base object it's overwritten.
 *
 * The first object is mutated so pass `{}` instead to avoid mutating the "first" object.
 *
 * ```ts
 *	override(base, config) // mutates base
 *	let merged = override({}, base, config) // mutates nothing
 * ```
 */
export function override<
	TBase extends
		Record<string, any> =
		Record<string, any>,
	TOthers extends
		(Record<string, any>)[] =
		(Record<string, any>)[],
	TOther extends TOthers[number] = TOthers[number]
>(
	base: TBase,
	...overrides: TOthers
): TBase & TOther {
	for (let other of overrides) {
		let obj: Record<string, any> = base
		let keys = push_if_not_in(keys_of(obj), keys_of(other))
		for (let prop of keys) {
			let base_val = obj[prop]
			let other_val = other[prop]

			if (base_val === undefined) {
				obj[prop] = other_val
			} else if (is_plain_object(other_val) && is_plain_object(base_val)) {
				obj[prop] = override(base_val, other_val)
			} else if (other_val !== undefined) {
				obj[prop] = other_val
			}
		}
	}
	return base as TBase & TOther
}
