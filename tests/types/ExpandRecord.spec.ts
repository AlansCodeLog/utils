import { expect_type, test_name } from "@/testing"
import type { ExpandClassRecord, ExpandRecord, RecordFromArray } from "@/types"


class Entry<TName extends string = string> {
	id!: TName
	constructor(_id: TName) { }
}
class Entries<
	T extends Entry[],
	TEntries = RecordFromArray<T, "id">,

> {
	entries!: TEntries
	constructor(_obj: T) { }
}
let instance = new Entries([new Entry("a"), new Entry("b")])
let entries = instance.entries
describe(test_name(), () => {
	it("works with specific keys", () => {
		let cast_entries = (entries as ExpandRecord<typeof entries, "c" | "d" | "e">)
		expect_type<typeof cast_entries.c.id, "===", string>(true)
		expect_type<typeof cast_entries.d.id, "===", string>(true)
		expect_type<typeof cast_entries.e.id, "===", string>(true)
	})
	it("works with string keys", () => {
		let cast_entries = (entries as ExpandRecord<typeof entries>)
		expect_type<typeof cast_entries.c.id, "===", string>(true)
		expect_type<typeof cast_entries[string]["id"], "===", string>(true)
	})
	it("works with classes (ExpandClassRecord)", () => {
		let expanded = instance as ExpandClassRecord<typeof instance, "entries", "c">
		expect_type<typeof expanded.entries, "===", {
			a: {id: string}
			b: {id: string}
			c: {id: string}
		}>(true)
		let permissive = instance as ExpandClassRecord<typeof instance, "entries">
		expect_type<typeof permissive.entries, "===", {
			a: {id: string}
			b: {id: string}
			[key: string]: {id: string}
		}>(true)
	})
})
