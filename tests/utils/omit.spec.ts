import { inspectError, omit, testName } from "index.js"
import { describe, expect, it } from "vitest"

import { complexObj } from "../_helpers/constants.js"


describe(testName(), () => {
	it("works", () => {
		const obj1 = { a: 1, b: 2, c: undefined }
		const picked = omit(obj1, ["a"])
		expect(picked).to.deep.equal({ b: 2, c: undefined })
		expect(Object.keys(picked)).to.deep.equal(["b", "c"])
	})
})
