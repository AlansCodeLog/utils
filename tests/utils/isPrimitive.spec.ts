import { testName } from "@/testing"
import { isPrimitive } from "@/utils"
import { Animal } from "@tests/_helpers/constants"
import { expect } from "@tests/chai"


function func(): void {}
describe(testName(), () => {
	it("works", () => {
		expect(isPrimitive("")).to.equal(true)
		expect(isPrimitive(0)).to.equal(true)
		expect(isPrimitive(false)).to.equal(true)
		expect(isPrimitive(true)).to.equal(true)
		expect(isPrimitive(Symbol("a"))).to.equal(true)
		expect(isPrimitive(func)).to.equal(true)
		expect(isPrimitive(null)).to.equal(true)
		expect(isPrimitive(undefined)).to.equal(true)
		expect(isPrimitive([])).to.equal(false)
		expect(isPrimitive({})).to.equal(false)
		expect(isPrimitive(new Animal())).to.equal(false)
	})
})
