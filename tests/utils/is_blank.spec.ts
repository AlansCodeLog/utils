import { expect_type, test_name } from "@/testing"
import { is_blank } from "@/utils"
import { expect } from "@tests/chai"


describe(test_name(), () => {
	it("works", () => {
		expect(is_blank("")).to.equal(true)
		expect(is_blank("a")).to.equal(false)
		expect(is_blank("    ")).to.equal(false)
	})
	it("types work", () => {
		let value = ""
		let test = is_blank("")
		expect_type<typeof test, "===", boolean>(true)
		if (is_blank(value)) { expect_type<typeof value, "===", "">(true) }
		if (!is_blank(value)) { expect_type<typeof value, "===", string>(true) }
	})
})
