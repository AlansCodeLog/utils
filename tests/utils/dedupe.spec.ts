import { expect } from "chai"

import { test_name } from "@/testing"
import { dedupe } from "@/utils"

import { complex_array } from "../test_helpers/constants"


describe(test_name(), () => {
	it("works", () => {
		let arr = ["a", "b", "c", "a"]
		let deduped = dedupe(arr)
		expect(deduped).to.not.equal(arr)
		expect(deduped).to.deep.equal(["a", "b", "c"])
	})
	it("works with complex arrays", () => {
		let arr = [...complex_array, ...complex_array]
		let deduped = dedupe(arr)
		expect(deduped).to.not.equal(arr)
		expect(deduped).to.deep.equal(complex_array)
	})
	it("works with many duplicates in various places", () => {
		let arr = ["a", "b", "a", "a", "a", "c", "a", "a"]
		let deduped = dedupe(arr)
		expect(deduped).to.not.equal(arr)
		expect(deduped).to.deep.equal(["a", "b", "c"])
	})
	it("works with mutate = true", () => {
		let arr = ["a", "a", "b", "c"]
		let deduped = dedupe(arr, { mutate: true })
		expect(deduped).to.equal(arr)
		expect(deduped).to.deep.equal(["a", "b", "c"])
	})
})
