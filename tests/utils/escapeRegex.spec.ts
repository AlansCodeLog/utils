import { testName } from "@/testing"
import { escapeRegex } from "@/utils"
import { expect } from "@tests/chai"


describe(testName(), () => {
	it("works", () => {
		const str = "-/\\^$*+?.()|[]{}"
		expect(escapeRegex(str)).to.equal(`\\${str.split("").join("\\")}`)
	})
})
