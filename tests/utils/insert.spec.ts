import { expect } from "@tests/chai"

import { inspect_error, test_name } from "@/testing"
import { insert } from "@/utils"


function naive_insert(str: string, into_str: string, range: number | [number, number]): string {
	range = typeof range === "number" ? [range, range] : range
	return into_str.slice(0, range[0]) + str + into_str.slice(range[1], into_str.length)
}


describe(test_name(), () => {
	it("works", () => {
		expect(insert("| ", "World", 0)).to.equal("| World")
		expect(insert("|", "World", 5)).to.equal("World|")
	})
	it("can insert/replace (sensible) ranges", () => {
		expect(insert("|", "World", [0, 5])).to.equal(naive_insert("|", "World", [0, 5]))
		expect(insert("|", "World", [-2, -1])).to.equal(naive_insert("|", "World", [-2, -1]))
		expect(insert("|", "World", [0, -1])).to.equal(naive_insert("|", "World", [0, -1]))
		expect(insert("|", "World", [-3, 5])).to.equal(naive_insert("|", "World", [-3, 5]))
	})
	it("works even with out of bound ranges", () => {
		// end > str.end
		expect(insert("|", "World", [0, 10])).to.equal(naive_insert("|", "World", [0, 10]))
		// both > str.end
		expect(insert("|", "World", [10, 20])).to.equal(naive_insert("|", "World", [10, 20]))

		// end < str.start
		expect(insert("|", "World", [0, -10])).to.equal(naive_insert("|", "World", [0, -10]))
		// both < str.start
		expect(insert("|", "World", [-10, -20])).to.equal(naive_insert("|", "World", [-10, -20]))
	})
	it("throws if the start range is after the end range (after normalization)", () => {
		expect(inspect_error(() => {
			insert("|", "World", [10, 0])
		}, false)).to.throw()
		expect(inspect_error(() => {
			insert("|", "World", [20, 10])
		}, false)).to.throw()
		expect(inspect_error(() => {
			insert("|", "World", [-1, 0])
		}, false)).to.throw()
		expect(inspect_error(() => {
			insert("|", "World", [-1, -5])
		}, false)).to.throw()
	})
	it("does not throw if the start range is after the end range but it wouldn't matter", () => {
		expect(inspect_error(() => {
			expect(insert("|", "World", [-10, 0])).to.equal(naive_insert("|", "World", [0, 0]))
		}, false)).to.not.throw()
		expect(inspect_error(() => {
			expect(insert("|", "World", [-20, -10])).to.equal(naive_insert("|", "World", [0, 0]))
		}, false)).to.not.throw()
	})
})

