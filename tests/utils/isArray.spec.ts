import { expectType, isArray, testName } from "index.js"
import { describe, expect, it } from "vitest"


describe(testName(), () => {
	it("works", () => {
		expect(isArray("")).to.equal(false)
		expect(isArray([""])).to.equal(true)
	})
	it("works with const in if statement", () => {
		const value = "".includes("") ? [""] : ""
		if (isArray(value)) { expectType<typeof value, "===", string[]>(true) }
		if (!isArray(value)) { expectType<typeof value, "===", "">(true) }
	})
	it("works with let in if statement", () => {
		// eslint-disable-next-line prefer-const
		let value = "".includes("") ? [""] : ""
		if (isArray(value)) { expectType<typeof value, "===", string[]>(true) }
		if (!isArray(value)) { expectType<typeof value, "===", string>(true) }
	})
})
