import { expect } from "chai"

import { inspect_error, test_name } from "@/testing"
import { assert_in_str_range } from "@/utils/assert_in_str_range"


describe(test_name(), () => {
	it("throws when out of range", () => {
		expect(inspect_error(() => {
			assert_in_str_range(-6, "Hello")
		})).to.throw()
		expect(inspect_error(() => {
			assert_in_str_range(6, "Hello")
		})).to.throw()
	})
	it("does not throw when in range", () => {
		expect(inspect_error(() => {
			assert_in_str_range(-5, "Hello")
		})).to.not.throw()
		expect(inspect_error(() => {
			assert_in_str_range(5, "Hello")
		})).to.not.throw()
	})
})

