import { expect } from "chai"

import { test_name } from "@/testing"
import { readable } from "@/utils"

import { complex_array } from "../test_helpers/constants"


describe(test_name(), () => {
	it("single element array", () => {
		expect(readable(["a"])).to.equal("a")
	})
	it("two element array", () => {
		expect(readable(["a", "b"])).to.equal("a and b")
	})
	it("three element array", () => {
		expect(readable(["a", "b", "c"])).to.equal("a, b, and c")
	})

	it("custom conjunction", () => {
		expect(readable(["a", "b", "c"], { conjunction: "or" })).to.equal("a, b, or c")
	})
	it("complex array", () => {
		expect(readable(complex_array)).to.equal(`0, a, Symbol(b), {...}, [...], {}, [], e function, anonymous function, Animal function, Animal instance, true, and false`)
	})
})
