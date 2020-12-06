import { expect } from "@tests/chai"
import { expectType, TypeEqual } from "ts-expect"

import { test_name } from "@/testing"
import { is_array } from "@/utils"


describe(test_name(), () => {
	it("works", () => {
		expect(is_array("")).to.equal(false)
		expect(is_array([""])).to.equal(true)
	})
})
