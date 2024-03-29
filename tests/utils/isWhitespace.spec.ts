import { isWhitespace, testName } from "index.js"
import { describe, expect, it } from "vitest"


describe(testName(), () => {
	it("works", () => {
		expect(isWhitespace("")).to.equal(true)
		expect(isWhitespace("a")).to.equal(false)
		expect(isWhitespace("a   ")).to.equal(false)
		expect(isWhitespace("    ")).to.equal(true)
		expect(isWhitespace("\t\n\r\n")).to.equal(true)
	})
})
