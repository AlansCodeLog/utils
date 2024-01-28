import { describe, expect, it } from "vitest"

import { expectType, isBlank, testName } from "../../src/index.js"


describe(testName(), () => {
	it("works", () => {
		expect(isBlank("")).to.equal(true)
		expect(isBlank("a")).to.equal(false)
		expect(isBlank("    ")).to.equal(false)
	})
	it("works with const in if statement", () => {
		const value = "".includes("") ? "" : "bla"
		if (isBlank(value)) { expectType<typeof value, "===", "">(true) }
		if (!isBlank(value)) { expectType<typeof value, "===", "bla">(true) }
	})
	it("works with let in if statement", () => {
		// eslint-disable-next-line prefer-const
		let value = "".includes("") ? "" : "bla"
		if (isBlank(value)) { expectType<typeof value, "===", "">(true) }
		if (!isBlank(value)) { expectType<typeof value, "===", string>(true) }
	})
})
