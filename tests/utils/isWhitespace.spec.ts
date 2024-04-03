import { describe, expect, it } from "vitest"

import { isWhitespace } from "../../src/index.js"


it("works", () => {
	expect(isWhitespace("")).to.equal(true)
	expect(isWhitespace("a")).to.equal(false)
	expect(isWhitespace("a   ")).to.equal(false)
	expect(isWhitespace("    ")).to.equal(true)
	expect(isWhitespace("\t\n\r\n")).to.equal(true)
})
