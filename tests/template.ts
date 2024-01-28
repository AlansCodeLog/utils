//@ts-expect-error remove this line when copying
import { testName } from "../../src/index.js"
import { describe, expect, it } from "vitest"


describe(testName(), () => {
	it("missing tests", () => {
		expect(true).to.equal(false)
	})
})
