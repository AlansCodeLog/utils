import { expect, it } from "vitest"

import { clampNumber } from "../src/utils/clampNumber.js"


it("works", () => {
	expect(clampNumber(0, 0, 10)).to.equal(0)
	expect(clampNumber(10, 0, 10)).to.equal(10)
	expect(clampNumber(5, 0, 10)).to.equal(5)
	expect(clampNumber(-5, 0, 10)).to.equal(0)
	expect(clampNumber(11, 0, 10)).to.equal(10)
	expect(clampNumber(-Infinity, 0, 10)).to.equal(0)
	expect(clampNumber(Infinity, 0, 10)).to.equal(10)
	expect(clampNumber(100, -Infinity, Infinity)).to.equal(100)
})
