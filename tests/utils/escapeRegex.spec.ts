import { describe, expect, it } from "vitest"

import { escapeRegex } from "../../src/index.js"
import { testName } from "../../src/testing/index.js"


describe(testName(), () => {
	it("works", () => {
		const str = "-/\\^$*+?.()|[]{}"
		expect(escapeRegex(str)).to.equal(`\\${str.split("").join("\\")}`)
	})
})
