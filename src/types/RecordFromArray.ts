import type { MakePrimitive } from "@/types"

/**
 * Creates a map from an array (of objects) T, keyed by it's object's TKey property value, with values of TValue.
 *
 * This is a simplified example to get the point across.
 *
 *
 * ```ts
 * type Arr = [{ id: "a" }, { id: "b" }]
 * type Entries = RecordFromArray<Arr, "id">
 *
 * ```
 * A variable of type `Entries` now autocompletes properly, e.g. `entries.` suggests `a` and `b` because it's type looks like this:
 *
 * ```ts
 * type Entries = {
 * 		a: { id: string },
 * 		b: { id: string }
 * }
 * ```
 *
 * The type could be made stricter (e.g. `a: {id: "a"}`) but this is usually inconvenient. So `TKey` is always turned into a primitive type.
 *
 * The type of the final value can also be overriden (except for the original key, which unfortunately you will get no warning if you try to override).
 *
 * ```ts
 * type Entries = RecordFromArray<Arr, "id", { extra:string }>
 * // results in
 * type Entries = {
 * 		a: { id: string, extra:string },
 * 		b: { id: string, extra: string }
 * }
 * ```
 *
 * It's intended for more complex situations where you have some `entry`/`Entry` function/class with a generic for the key type that serves to "capture" it, otherwise we'd just get `Record<string, Entry>`.
 *
 * Using classes:
 * ```ts
 * // The TName generic type "captures" the id.
 * class Entry<TName extends string = string> {
 * 	id!: TName
 * 	constructor(_id: TName) { }
 * }
 * class Entries<
 * 	T extends Entry[],
 * 	TEntries = RecordFromArray<T, "id">
 * > {
 * 	entries!: TEntries
 * 	constructor(_obj: T) { }
 * }
 * const entries = new Entries([new Entry("a"), new Entry("b")]).entries
 * ```
 * The type if hovered over it will just say: `RecordFromArray<...bunch of confusing types...>` but it's just this again except each value is an instance of `Entry`:
 *
 * ```ts
 * type entries = {
 * 	a: { id: string } // aka Entry<string>
 * 	b: { id: string } // aka Entry<string>
 * }
 *  ```
 *
 * Using functions:
 *
 * Here the types will be slightly clearer since there isn't a class wrapping each entry.
 *
 * ```ts
 * function entry<TName extends string = string>(id: TName): {id: TName} { }
 * function record<T extends {id: string}[]>(arr: T): RecordFromArray<T, "id"> { }
 * const entries = record([entry("a"), entry("b")])
 * ```
 */
export type RecordFromArray<
	T extends any[] | readonly any[],
	TKey extends string & keyof T[number],
	TExtra extends Record<any, any> = {},
	TValue extends Record<TKey, any> = T[number],
> = {
	[K in TValue[TKey]]:
		TValue extends { [k in TKey]: K }
		? {
			[KV in keyof TValue]:
				KV extends TKey
					? MakePrimitive<TValue[KV]>
					: TValue[KV]
		} & {
			[KE in keyof TExtra]:
				KE extends TKey
					? MakePrimitive<TValue[KE]>
					: TExtra[KE]
		}
		: never
}

