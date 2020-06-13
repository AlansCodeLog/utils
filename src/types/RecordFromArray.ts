/** @packageDocumentation @module types */
/**
 * Creates a map from an array (of objects) T, keyed by it's object's TKey property value, with values of TValue.
 *
 * This is a simplified example to get the point across.
 *
 *
 * ```ts
 * type obj = { prop: string }
 * type arr = [{ prop: "a" }, { prop: "b" }]
 * // @ts-ignore
 * type record = RecordFromArray<arr, "prop", obj>
 *
 * ```
 * Record now autocompletes properly, e.g. `record.` suggests `a` and `b` because it's type looks like this:
 *
 * ```ts
 * type record = {
 * 		a: {prop: string},
 * 		b: {prop: string}
 * }
 * ```
 *
 * It requires a `@ts-ignore` in this case (normally it would not) because we need to override the value type with `{ prop: string }` otherwise the value becomes a union of *all* the values for *each* value (e.g. `a`, `b` for each `a`,`b`.).
 *
 * It's intended for more complex situations where you have some `entry`/`Entry` function/class with a generic for the key type that serves to "capture" it, otherwise we'd just get `Record<string, Entry>`. That's why in the example above a const array type is used (although it's not the same thing which is another reason why the above requires the `@ts-ignore`).
 *
 * Also note that if you want to pass a const array to `record`/`Record`, you need to make the function/class extend the readonly version of the array, e.g. `T extends Entry[] | readonly Entry[]`.
 *
 * Using classes:
 * ```ts
 * // The TName generic type "captures" the id.
 * class Entry<TName extends string = string> {
 * 	id: TName
 * 	constructor(id: TName) { }
 * }
 * class Record<T extends Entry[], TEntries = RecordFromArray<T, "id">> {
 * 	entries: TEntries
 * 	constructor(obj: T) { }
 * }
 * let entries = new Record([new Entry("a"), new Entry("b")]).entries
 * ```
 * The type if hovered over it will just say: `RecordFromArray<...bunch of confusing types...>` but it's just this:
 * ```ts
 * type entries = {
 * 	a: {id: "a"} // <= Entry instance
 * 	b: {id: "b"} // <= Entry instance
 * }
 *  ```
 *
 * Using functions:
 *
 * ```ts
 * function entry<TName extends string = string>(id: TName): {id: TName} { }
 * function record<T extends {id: string}[]>(arr: T): RecordFromArray<T, "id"> { }
 * let entries = record([entry("a")])
 * ```
 * In this case the type is clearer when you hover over it: `Record<"a" | "b", { id: string }>`, but it expands to the same thing as with classes (except the entries aren't instances of anything).
 * ```ts
 * type entries = {
 * 	a: {id: "a"}
 * 	b: {id: "b"}
 * }
 * ```
 */
export type RecordFromArray<
	T extends any[] | readonly any[],
	TKey extends string & keyof T[number],
	TValue extends
		T extends readonly any[] ? Readonly<T[number]> : T[number] =
		T extends readonly any[] ? Readonly<T[number]> : T[number]
> = Record<T[number][TKey], TValue>
