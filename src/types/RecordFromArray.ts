/** @packageDocumentation @module types */
/** @packageDocumentation @module types */
/**
 * Creates a map from an array (of objects) T, keyed by it's object's TKey property value, with values of TValue.
 *
 * This is a simplified example to get the point across.
 * It requires a `@ts-ignore` because the obj type needs to be passed otherwise `{prop: string}` in each record entry becomes a union of all the `arr` entries.
 * ```ts
 * type obj = { prop: string }
 * type arr = [{ prop: "a" }, { prop: "b" }, { prop: "c" }]
 * // @ts-ignore
 * type record = RecordFromArray<arr, "prop", obj>
 * // record = {
 * //		a: {prop: string},
 * //		b: {prop: string}
 * //}
 * // record now autocompletes properly, e.g. `record.` suggests `a` and `b`.
 * ```
 *
 * It's intended for more complex situations like the following. Note that you always need the `entry`/`Entry` function/class. They serve to "capture" the property value, otherwise we'd just get `Record<string, Entry>`. That's why in the example above const is used (although it's not the same thing which is why the above requires `@ts-ignore`).
 *
 * Also note that if you want to pass a const array to `record`/`Record`, you need to make the function/class extend the readonly version of the array, e.g. `T extends Entry[] | readonly Entry[]`.
 *
 * Using classes:
 * ```ts
 * class Entry<TName extends string = string> {
 * 	id: TName
 * 	constructor(id: TName) { }
 * }
 * class Record<T extends Entry[], TEntries = RecordFromArray<T, "id">> {
 * 	entries: TEntries
 * 	constructor(obj: T) { }
 * }
 * let entries = new Record([new Entry("a"), new Entry("b")]).entries
 * // the type if hovered over it will just say: RecordFromArray<...bunch of confusing types...>
 * // but it's just this:
 * // entries = {
 * // 	a: {id: "a"} // <= Entry instance
 * // 	b: {id: "b"} // <= Entry instance
 * // }
 *  ```
 *
 * Using function:
 * ```ts
 * function entry<TName extends string = string>(id: TName): {id: TName} { }
 * function record<T extends {id: string}[]>(arr: T): RecordFromArray<T, "id"> { }
 * let entries = record([entry("a")])
 * // in this case the type is clearer when you hover over it: Record<"a" | "b", { id: string }>
 * // but it expands to the same thing as before (except the entries aren't instances of anything)
 * // entries = {
 * // 	a: {id: "a"}
 * // 	b: {id: "b"}
 * // }
 * ```
 */
export type RecordFromArray<
	T extends any[] | readonly any[],
	TKey extends string & keyof T[number],
	TValue extends
		T extends readonly any[] ? Readonly<T[number]> : T[number] =
		T extends readonly any[] ? Readonly<T[number]> : T[number]
> = Record<T[number][TKey], TValue>
