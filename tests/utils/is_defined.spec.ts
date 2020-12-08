import { expect_type, test_name } from "@/testing"
import { is_defined } from "@/utils"
import { expect } from "@tests/chai"


describe(test_name(), () => {
	it("works", () => {
		expect(is_defined(null)).to.equal(true)
		expect(is_defined(undefined)).to.equal(false)
		expect(is_defined("anything")).to.equal(true)
		expect(is_defined({})).to.equal(true)
	})
	it("types work", () => {
		let value
		let test = is_defined(value)
		expect_type<typeof test, "===", boolean>(true)
		if (is_defined(value)) { expect_type<typeof value, "===", undefined>(true) }
		if (!is_defined(value)) { expect_type<never, "===", typeof value>(true) }
	})
})
