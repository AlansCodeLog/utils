import { describe, expect, it } from "vitest"

import { set } from "../../src/index.js"
import { testName } from "../../src/testing/index.js"


describe(testName(), () => {
	it("works", () => {
		const obj = { a: { b: ["c"]} }
		const value = set(obj, ["a", "b", 0], "changed")
		expect(obj).to.equal(value)
		expect(value.a.b[0]).to.equal("changed")
	})
	it("returns given value when passed no keys", () => {
		const obj = { a: { b: ["c"]} }
		expect(() => {
			const value = set(obj, [], "change")
			expect(value).to.equal("change")
			expect(obj).to.deep.equal({ a: { b: ["c"]} })
		}).to.not.throw()
	})
	it("works even if strings used for arrays", () => {
		const obj = { a: { b: ["c"]} }
		const value = set(obj, ["a", "b", "0"], "change")
		expect(obj).to.equal(value)
		expect(obj.a.b[0]).to.equal("change")
	})
})
