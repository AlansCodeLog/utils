import { expect } from "chai"

import { test_name } from "@/testing"


describe(test_name(), () => {
	it("missing tests", () => {
		expect(true).to.equal(false)
	})
})
