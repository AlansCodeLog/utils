import { describe, expect, it } from "vitest"

import { escapeRegex, testName } from "../../src/index.js"


describe(testName(), () => {
	it("works", () => {
		const str = "-/\\^$*+?.()|[]{}"
		expect(escapeRegex(str)).to.equal(`\\${str.split("").join("\\")}`)
	})
})
