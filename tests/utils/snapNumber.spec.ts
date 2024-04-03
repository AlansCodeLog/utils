import { describe, expect, it } from "vitest"

import { testName } from "../../src/testing/index.js"
import { snapNumber } from "../../src/utils/snapNumber.js"


describe(testName(), () => {
	it("snap", ()=> {
		expect(snapNumber(0.1, 10)).to.equal(0)
		expect(snapNumber(5.1, 10)).to.equal(10)
	})
})
