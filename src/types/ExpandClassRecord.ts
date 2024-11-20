import type { ExpandRecord } from "./ExpandRecord.js"

/**
 * Does {@link ExpandRecord} on a property of a class. Useful for permanently casting a class's key (e.g. entries) with additional keys or more permissive entry keys.
 *
 * For example:
 *
 * ```ts
 * const obj = new Entries([{key:"a"}])
 * // obj.entries = {a: {key: "a"}}
 *
 * const expanded = obj as ExpandClassRecord<typeof obj, "entries", "b">
 * expanded.b // no error
 *
 * const permissive = obj as ExpandClassRecord<typeof obj, "entries">
 *
 * permissive.entries. // a still gets suggested
 * permissive.entries.anything // no error
 * ```
 */
export type ExpandClassRecord<
	TClass,
	TKey extends keyof TClass,
	TAdd extends
		string | number =
		string,
	TValue extends
		TClass[TKey][keyof TClass[TKey]] | any =
		TClass[TKey][keyof TClass[TKey]],
> = TClass & Record<TKey, ExpandRecord<TClass[TKey], TAdd, TValue>>
