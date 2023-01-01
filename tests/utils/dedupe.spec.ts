import { dedupe, testName } from "index.js"
import { describe, expect, it } from "vitest"

import { complexArray } from "../_helpers/constants.js"


describe(testName(), () => {
	it("works", () => {
		const arr = ["a", "b", "c", "a"]
		const deduped = dedupe(arr)
		expect(deduped).to.not.equal(arr)
		expect(deduped).to.deep.equal(["a", "b", "c"])
	})
	it("works with complex arrays", () => {
		const arr = [...complexArray, ...complexArray]
		const deduped = dedupe(arr)
		expect(deduped).to.not.equal(arr)
		expect(deduped).to.deep.equal(complexArray)
	})
	it("works with many duplicates in various places", () => {
		const arr = ["a", "b", "a", "a", "a", "c", "a", "a"]
		const deduped = dedupe(arr)
		expect(deduped).to.not.equal(arr)
		expect(deduped).to.deep.equal(["a", "b", "c"])
	})
	it("works with mutate = true", () => {
		const arr = ["a", "a", "b", "c"]
		const deduped = dedupe(arr, { mutate: true })
		expect(deduped).to.equal(arr)
		expect(deduped).to.deep.equal(["a", "b", "c"])
	})
})
