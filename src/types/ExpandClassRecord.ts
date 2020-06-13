/** @packageDocumentation @module types */

import type { ExpandRecord } from "./ExpandRecord"

/**
 * Does {@link ExpandRecord} on a property of a class. Useful for permanently casting a class's key (e.g. entries) with additional keys or more permissive entry keys.
 *
 * For example:
 *
 * ```ts
 * let obj = new MyClass([{key:"a"}])
 * // obj.entries = {a: {key: "a"}}
 *
 * let expanded = obj as ExpandClassRecord<typeof obj, "entries", "b">
 * expanded.b // no error
 *
 * let permissive = obj as ExpandClassRecord<typeof obj, "entries">
 *
 * expanded. // a still gets suggested
 * expanded.anything // no error
 * ```
 */
export type ExpandClassRecord<
	TClass,
	TKey extends keyof TClass,
	TAdd extends string | number = keyof TClass[TKey] & string,
	TValue = TClass[TKey][keyof TClass[TKey]]
> = TClass & { [T in TKey]: ExpandRecord<TClass[TKey], TAdd, TValue> }
