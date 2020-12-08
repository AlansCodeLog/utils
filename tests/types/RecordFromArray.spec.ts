import { expect_type, test_name } from "@/testing"
import type { RecordFromArray } from "@/types"


describe(test_name(), () => {
	it("words with types", () => {
		type Arr = [{ id: "a" }, { id: "b" }]
		type Entries = RecordFromArray<Arr, "id">
		expect_type<Entries["a"]["id"], "===", string>(true)
		expect_type<Entries, "===", {
			a: { id: string }
			b: { id: string }
		}>(true)
	})
	it("works with overrides", () => {
		type Arr = [{ id: "a" }, { id: "b" }]
		type Entries = RecordFromArray<Arr, "id", { other: string }>
		expect_type<Entries["a"], "===", {id: string, other: string}>(true)
		expect_type<Entries, "===", {
			a: { id: string, other: string }
			b: { id: string, other: string }
		}>(true)
	})
	it("incorrect override has no effect", () => {
		type Arr = [{ id: "a" }, { id: "b" }]
		type Entries = RecordFromArray<Arr, "id", { other: string, id: number }>
		expect_type<Entries["a"], "===", {id: string, other: string}>(true)
		expect_type<Entries, "===", {
			a: { id: string, other: string }
			b: { id: string, other: string }
		}>(true)
	})
	it("works with classes", () => {
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
		let entries = new Entries([new Entry("a"), new Entry("b")]).entries
		expect_type<typeof entries.a.id, "===", string>(true)
		expect_type<typeof entries, "===", {
			a: Entry<string>
			b: Entry<string>
		}>(true)
	})
	it("works with functions", () => {
		function entry<TName extends string = string>(_id: TName): { id: TName } {
			return undefined as any
		}
		function record<T extends { id: string }[]>(_arr: T): RecordFromArray<T, "id"> {
			return undefined as any
		}
		let entries = record([entry("a"), entry("b")])
		expect_type<typeof entries.a.id, "===", string>(true)
		expect_type<typeof entries, "===", {
			a: { id: string }
			b: { id: string }
		}>(true)
	})
})
