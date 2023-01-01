import { expectType, testName } from "index.js"
import type { RecordFromArray } from "types/index.js"
import { describe, expect, it } from "vitest"


describe(testName(), () => {
	it("words with types", () => {
		type Arr = [{ id: "a" }, { id: "b" }]
		type Entries = RecordFromArray<Arr, "id">
		expectType<Entries["a"]["id"], "===", string>(true)
		expectType<Entries, "===", {
			a: { id: string }
			b: { id: string }
		}>(true)
	})
	it("works with overrides", () => {
		type Arr = [{ id: "a" }, { id: "b" }]
		type Entries = RecordFromArray<Arr, "id", { other: string }>
		expectType<Entries["a"], "===", { id: string, other: string }>(true)
		expectType<Entries, "===", {
			a: { id: string, other: string }
			b: { id: string, other: string }
		}>(true)
	})
	it("incorrect override has no effect", () => {
		type Arr = [{ id: "a" }, { id: "b" }]
		type Entries = RecordFromArray<Arr, "id", { other: string, id: number }>
		expectType<Entries["a"], "===", { id: string, other: string }>(true)
		expectType<Entries, "===", {
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
		const entries = new Entries([new Entry("a"), new Entry("b")]).entries
		expectType<typeof entries.a.id, "===", string>(true)
		expectType<typeof entries, "===", {
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
		const entries = record([entry("a"), entry("b")])
		expectType<typeof entries.a.id, "===", string>(true)
		expectType<typeof entries, "===", {
			a: { id: string }
			b: { id: string }
		}>(true)
	})
})
