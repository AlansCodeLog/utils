import { expect } from "chai"

import { test_name } from "@/testing"


describe(test_name(), () => {
	it("no tests", () => {
		expect(true).to.equal(true)
	})
})
