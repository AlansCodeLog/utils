import { crop } from "./crop.js"
import { indent } from "./indent.js"
import { isArray } from "./isArray.js"
import { isObject } from "./isObject.js"
import { isPlainObject } from "./isPlainObject.js"
import { isPrimitive } from "./isPrimitive.js"
import { pretty } from "./pretty.js"
import { pushIfNotIn } from "./pushIfNotIn.js"

import { keys as keysOf } from "@/retypes"


/**
 * Basic object merger (does not handle Maps, Sets, class instances, etc). Merges like lodash merge* except arrays are not merged position by position, they're just combined. For arrays that just override the existing key use {@link override}
 *
 * The first object is mutated so pass `{}` instead to avoid mutating it.
 *
 * ```ts
 *	merge(base, other) // mutates base
 *	const merged = merge({}, base, other) // mutates nothing
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
	TOther extends TOthers[number] = TOthers[number],
>(
	base: TBase | undefined,
	...others: TOthers
): TBase & TOther {
	if (base === undefined) {
		base = isArray(others[0])
			? [] as any
			: {} as any
	}

	for (const other of others as Record<string, any>[]) {
		if (isArray(base)) {
			if (!isArray(other)) {
				throw new Error(crop`
					Cannot merge object over array.
					Array:
						${indent(pretty(base), 6)}
					Object:
						${indent(pretty(other), 6)}
				`)
			}
			// if we happen to be passed a reference to the same array for the override we'll get stuck in an infinite loop
			const overrideArr = other === base ? [...other] : other

			for (const item of overrideArr) (base).push(item)
		} else if (isObject(base)) {
			const obj: Record<string, any> = base

			if (!isObject(other)) {
				throw new Error(crop`
					Cannot merge array over object.
					Object:
						${indent(pretty(base), 6)}
					Array:
						${indent(pretty(other), 6)}
				`)
			}
			if (!isPlainObject(base) || !isPlainObject(other)) {
				throw new Error(crop`
					Merge was not designed to handle merging of non-plain objects (i.e. class Instances).
					${!isPlainObject(base)
					? `The following base does not seem to be a plain object:
						(${(base as any).constructor.name}) ${indent(pretty(base), 6)}`
						: ""
					}
					${!isPlainObject(other)
					? crop`The following override does not seem to be a plain object:
						(${(other as any).constructor.name}) ${indent(pretty(other), 6)}`
						: ""
					}
				`)
			}

			const keys = pushIfNotIn(keysOf(obj), ...keysOf(other))
			for (const prop of keys) {
				const baseVal = obj[prop]
				const otherVal = other[prop]

				if (baseVal === undefined) {
					if (isPrimitive(otherVal)) {
						obj[prop] = otherVal
					} else {
						obj[prop] = merge(undefined, otherVal)
					}
				} else if (isObject(otherVal)) {
					if (isObject(baseVal)) {
						obj[prop] = merge(baseVal, otherVal)
					} else {
						obj[prop] = merge(undefined, otherVal)
					}
				} else if (isArray(otherVal)) {
					if (isArray(baseVal)) {
						obj[prop] = merge(baseVal, otherVal)
					} else {
						obj[prop] = merge(undefined, otherVal)
					}
				} else if (otherVal !== undefined) {
					if (isPrimitive(otherVal)) {
						obj[prop] = otherVal
					} else {
						obj[prop] = merge(undefined, otherVal)
					}
				}
			}
		}
	}
	return base as TBase & TOther
}
