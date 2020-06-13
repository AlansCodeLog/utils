/** @packageDocumentation @module types */

/**
 * Expands a record type. By default expands the record to accept any string key.

 * Record types are annoying to work with in typescript when you need to add keys to them. This utility type properly expands the types of a record type after its creation.
 *
 * For example, it's possible to map array entries to objects by some key like this (see @{link RecordFromArray}):
 * ```ts
 * let obj = new MyClass([{key:"a"}, {key:"b"}])
 * // obj.entries = {a: {key: "a"}, b: {key: "b"}}
 * ```
 *
 * This is really nice because now those keys get autocompleted:
 * ```ts
 * obj.entries. // suggest a and b
 * ```
 *
 * BUT, the moment you try to add keys, typescript will complain and you will, of course, no longer get the correct suggestions:
 *
 * ```ts
 * obj.add({key: "c"})
 * obj.entries.c // errors and c is not suggested
 * ```
 *
 * You could just ignore this, cast the object as any, etc, but this type provides a more accurate solution that better describes what's going on.
 *
 * ```ts
 * let vars = (obj.variables as ExpandRecord<typeof obj.variables, "c" | "d" | "e">)
 * vars.c // no error
 * vars.d // no error
 * vars.e // no error
 * // you can also just allow any string key
 * let vars = (obj.variables as ExpandRecord<typeof obj.variables>)
 * // same as (obj.variables as ExpandRecord<typeof obj.variables, string>)
 *
 * vars. // a still gets suggested
 * vars.anything // no error
 * ```
 *
 * Note that we must store the cast type in a new variable. `obj.variables` remains incorrectly type, so there's also a utility type to cast a property on a class: {@link ExpandClassRecord}.
 */
export type ExpandRecord<
	TRecord,
	TAdd extends string | number = keyof TRecord & string,
	TValue = TRecord[keyof TRecord]
> = TRecord & { [Key in TAdd]: TValue }
