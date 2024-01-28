import { testName } from "../../src/index.js"
import { describe, expect, it } from "vitest"


describe(testName(), () => {
	it("missing tests", () => {
		expect(true).to.equal(false)
	})
})
