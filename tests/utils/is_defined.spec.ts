import { expect } from "chai"
import { expectType, TypeEqual } from "ts-expect"

import { test_name } from "@/testing"
import { is_defined } from "@/utils"


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
		expectType<TypeEqual<typeof test, boolean>>(true)
		if (is_defined(value)) { expectType<TypeEqual<typeof value, undefined>>(true) }
		if (!is_defined(value)) { expectType<TypeEqual<never, typeof value>>(true) }
	})
})
