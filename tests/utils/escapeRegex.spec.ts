import { escapeRegex, testName } from "index.js"
import { describe, expect, it } from "vitest"


describe(testName(), () => {
	it("works", () => {
		const str = "-/\\^$*+?.()|[]{}"
		expect(escapeRegex(str)).to.equal(`\\${str.split("").join("\\")}`)
	})
})
