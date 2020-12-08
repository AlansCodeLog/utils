import { test_name } from "@/testing"
import { is_primitive } from "@/utils"
import { expect } from "@tests/chai"
import { Animal } from "@tests/test_helpers/constants"


function func(): void {}
describe(test_name(), () => {
	it("works", () => {
		expect(is_primitive("")).to.equal(true)
		expect(is_primitive(0)).to.equal(true)
		expect(is_primitive(false)).to.equal(true)
		expect(is_primitive(true)).to.equal(true)
		expect(is_primitive(Symbol("a"))).to.equal(true)
		expect(is_primitive(func)).to.equal(true)
		expect(is_primitive(null)).to.equal(true)
		expect(is_primitive(undefined)).to.equal(true)
		expect(is_primitive([])).to.equal(false)
		expect(is_primitive({})).to.equal(false)
		expect(is_primitive(new Animal())).to.equal(false)
	})
})
