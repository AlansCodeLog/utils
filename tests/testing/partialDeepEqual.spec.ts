import { testName } from "@/testing"
import { expect } from "@tests/chai"


describe(testName(), () => {
	it.only("works", () => {
		expect({ a: "a", b: "b" }).to.partial.deep.equal({ a: "a" })
		expect({ a: "a", b: "b" }).to.not.partial.deep.equal({ a: undefined })
		expect({ a: "a", b: "b" }).to.partial.deep.equal({})
		expect({ a: undefined, b: "b" }).to.partial.deep.equal({ a: undefined })
		expect({ a: "a", b: "b" }).to.not.partial.deep.equal({ a: undefined })
	})
})
