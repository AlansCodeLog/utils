/**
 * Expands a record type. By default expands the record to accept any string key.
 *
 * Record types are annoying to work with in typescript when you need to add keys to them. This utility type properly expands the types of a record type after its creation.
 *
 * For example, it's possible to map array entries to objects by some key like this (see {@link RecordFromArray}):
 *
 * ```ts
 * const obj = new Entries([{ key:"a" }, { key:"b" }])
 * // obj.entries = { a: { key: string }, b: { key: string } }
 * ```
 *
 * This is really nice because now those keys get autocompleted:
 * ```ts
 * obj.entries. // suggests a and b
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
 * const entries = (obj.entries as ExpandRecord<typeof obj.entries, "c" | "d" | "e")
 *
 * entries.c // no error
 * entries.d // no error
 * entries.e // no error
 *
 * // you can also just allow any string key (string is the default if we leave out the key type)
 * const entries =  (obj.entries as ExpandRecord<typeof obj.entries>)
 *
 * entries. // a still gets suggested
 * entries.anything // no error
 * ```
 *
 * Note that `obj.entries` remains incorrectly type, so there's also a utility type to cast a property on a class: {@link ExpandClassRecord}.
 */
export type ExpandRecord<
	TRecord,
	TAdd extends string | number | symbol = string | number | symbol,
	TValue extends TRecord[keyof TRecord] | any = TRecord[keyof TRecord],
> = TRecord & { [Key in TAdd]: TValue}
