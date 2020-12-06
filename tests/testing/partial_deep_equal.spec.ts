import { expect } from "@tests/chai"
import { expectType } from "ts-expect"

import { test_name } from "@/testing"


describe(test_name(), () => {
	it.only("works", () => {
		expect({ a: "a", b: "b" }).to.partial.deep.equal({ a: "a" })
		expect({ a: "a", b: "b" }).to.not.partial.deep.equal({ a: undefined })
		expect({ a: "a", b: "b" }).to.partial.deep.equal({})
		expect({ a: undefined, b: "b" }).to.partial.deep.equal({ a: undefined })
		expect({ a: "a", b: "b" }).to.not.partial.deep.equal({ a: undefined })
	})
})
