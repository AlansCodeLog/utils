import { expect } from "chai"
import { expectType, TypeEqual } from "ts-expect"

import { test_name } from "@/testing"
import { is_blank } from "@/utils"


describe(test_name(), () => {
	it("works", () => {
		expect(is_blank("")).to.equal(true)
		expect(is_blank("a")).to.equal(false)
		expect(is_blank("    ")).to.equal(false)
	})
	it("types work", () => {
		let value = ""
		let test = is_blank("")
		expectType<TypeEqual<typeof test, boolean>>(true)
		if (is_blank(value)) { expectType<TypeEqual<typeof value, "">>(true) }
		if (!is_blank(value)) { expectType<TypeEqual<typeof value, string>>(true) }
	})
})
