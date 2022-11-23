import { expectType, testName } from "@/testing"
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
const instance = new Entries([new Entry("a"), new Entry("b")])
const entries = instance.entries
describe(testName(), () => {
	it("works with specific keys", () => {
		const castEntries = (entries as ExpandRecord<typeof entries, "c" | "d" | "e">)
		expectType<typeof castEntries.c.id, "===", string>(true)
		expectType<typeof castEntries.d.id, "===", string>(true)
		expectType<typeof castEntries.e.id, "===", string>(true)
	})
	it("works with string keys", () => {
		const castEntries = (entries as ExpandRecord<typeof entries>)
		expectType<typeof castEntries.c.id, "===", string>(true)
		expectType<typeof castEntries[string]["id"], "===", string>(true)
	})
	it("works with classes (ExpandClassRecord)", () => {
		const expanded = instance as ExpandClassRecord<typeof instance, "entries", "c">
		expectType<typeof expanded.entries, "===", {
			a: { id: string }
			b: { id: string }
			c: { id: string }
		}>(true)
		const permissive = instance as ExpandClassRecord<typeof instance, "entries">
		expectType<typeof permissive.entries, "===", {
			a: { id: string }
			b: { id: string }
			[key: string]: { id: string }
		}>(true)
	})
})
