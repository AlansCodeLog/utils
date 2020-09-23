/** @packageDocumentation @module utils */

import { crop } from "./crop"
import { indent } from "./indent"
import { is_array } from "./is_array"
import { is_object } from "./is_object"
import { is_plain_object } from "./is_plain_object"
import { is_primitive } from "./is_primitive"
import { pretty } from "./pretty"
import { push_if_not_in } from "./push_if_not_in"

import { keys as keys_of } from "@/retypes"


/**
 * Basic object merger (does not handle Maps, Sets, class instances, etc). Merges like lodash merge* except arrays are not merged position by position, they're just combined. For arrays that just override the existing key use {@link override}
 *
 * The first object is mutated so pass `{}` instead to avoid mutating the "first" object.
 *
 * ```ts
 *	merge(base, other) // mutates base
 *	let merged = merge({}, base, other) // mutates nothing
 * ```
 *
 * \* Arrays are not deep merged. They are not cloned if there is no overriding key, and their items are never looked through.
 *
 */
export function merge<
	TBase extends
		Record<string, any> | any[] =
		Record<string, any> | any[],
	TOthers extends
		(Record<string, any> | any[] | readonly any[])[] =
		(Record<string, any> | any[] | readonly any[])[],
	TOther extends TOthers[number] = TOthers[number]
>(
	base: TBase | undefined,
	...others: TOthers
): TBase & TOther {
	if (base === undefined) {
		base = is_array(others[0])
			? [] as any
			: {} as any
	}

	for (let other of others as Record<string, any>[]) {
		if (is_array(base)) {
			if (!is_array(other)) {
				throw new Error(crop`
					Cannot merge object over array.
					Array:
						${indent(pretty(base), 6)}
					Object:
						${indent(pretty(other), 6)}
				`)
			}
			// if we happen to be passed a reference to the same array for the override we'll get stuck in an infinite loop
			let override_arr = other === base ? [...other] : other

			for (let item of override_arr) (base as any[]).push(item)
		} else if (is_object(base)) {
			let obj: Record<string, any> = base

			if (!is_object(other)) {
				throw new Error(crop`
					Cannot merge array over object.
					Object:
						${indent(pretty(base), 6)}
					Array:
						${indent(pretty(other), 6)}
				`)
			}
			if (!is_plain_object(base) || !is_plain_object(other)) {
				throw new Error(crop`
					Merge was not designed to handle merging of non-plain objects (i.e. class Instances).
					${!is_plain_object(base)
					? `The following base does not seem to be a plain object:
						(${(base as any).constructor.name}) ${indent(pretty(base), 6)}`
						: ""
					}
					${!is_plain_object(other)
					? crop`The following override does not seem to be a plain object:
						(${(other as any).constructor.name}) ${indent(pretty(other), 6)}`
						: ""
					}
				`)
			}

			let keys = push_if_not_in(keys_of(obj), keys_of(other))
			for (let prop of keys) {
				let base_val = obj[prop]
				let other_val = other[prop]

				if (base_val === undefined) {
					if (is_primitive(other_val)) {
						obj[prop] = other_val
					} else {
						obj[prop] = merge(undefined, other_val)
					}
				} else if (is_object(other_val)) {
					if (is_object(base_val)) {
						obj[prop] = merge(base_val, other_val)
					} else {
						obj[prop] = merge(undefined, other_val)
					}
				} else if (is_array(other_val)) {
					if (is_array(base_val)) {
						obj[prop] = merge(base_val, other_val)
					} else {
						obj[prop] = merge(undefined, other_val)
					}
				} else if (other_val !== undefined) {
					if (is_primitive(other_val)) {
						obj[prop] = other_val
					} else {
						obj[prop] = merge(undefined, other_val)
					}
				}
			}
		}
	}
	return base as TBase & TOther
}
