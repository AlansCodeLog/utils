import { expect } from "@tests/chai"
import { expectType } from "ts-expect"

import { test_name } from "@/testing"


describe(test_name(), () => {
	it("missing tests", () => {
		expect(true).to.equal(false)
	})
})
