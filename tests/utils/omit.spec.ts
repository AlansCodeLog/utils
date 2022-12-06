import { describe, expect, it } from "vitest"

import { inspectError, testName } from "@/testing"
import { omit } from "@/utils"
import { complexObj } from "@tests/_helpers/constants.js"


describe(testName(), () => {
	it("works", () => {
		const obj1 = { a: 1, b: 2, c: undefined }
		const picked = omit(obj1, ["a"])
		expect(picked).to.deep.equal({ b: 2, c: undefined })
		expect(Object.keys(picked)).to.deep.equal(["b", "c"])
	})
})
