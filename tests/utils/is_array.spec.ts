import { test_name } from "@/testing"
import { is_array } from "@/utils"
import { expect } from "@tests/chai"


describe(test_name(), () => {
	it("works", () => {
		expect(is_array("")).to.equal(false)
		expect(is_array([""])).to.equal(true)
	})
})
