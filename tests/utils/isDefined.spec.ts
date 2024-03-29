import { expectType, isDefined, testName } from "index.js"
import { describe, expect, it } from "vitest"


describe(testName(), () => {
	it("works", () => {
		expect(isDefined(null)).to.equal(true)
		expect(isDefined(undefined)).to.equal(false)
		expect(isDefined("anything")).to.equal(true)
		expect(isDefined({})).to.equal(true)
	})
	it("types work", () => {
		let value
		const test = isDefined(value)
		expectType<typeof test, "===", boolean>(true)
		if (isDefined(value)) { expectType<typeof value, "===", undefined>(true) }
		if (!isDefined(value)) { expectType<never, "===", typeof value>(true) }
	})
})
