import { describe, expect, it } from "vitest"

import { snapNumber } from "../../src/utils/snapNumber.js"


it("snap", () => {
	expect(snapNumber(0.1, 10)).to.equal(0)
	expect(snapNumber(5.1, 10)).to.equal(10)
})
