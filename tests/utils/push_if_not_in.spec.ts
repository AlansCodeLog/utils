import { expect } from "chai"

import { test_name } from "@/testing"
import { push_if_not_in } from "@/utils"


describe(test_name(), () => {
	it("works", () => {
		let arr1 = ["a", "b", "b"]
		let arr2 = ["c"]
		let arr_union = push_if_not_in(arr1, arr2)
		expect(arr1).to.equal(arr_union)
		expect(arr_union).to.deep.equal(["a", "b", "b", "c"])
	})
	it("optionally de-duplicates", () => {
		let arr1 = ["a", "b", "b"]
		let arr2 = ["c"]
		let arr_union = push_if_not_in([], arr1, arr2)
		expect(arr1).to.not.equal(arr_union)
		expect(arr_union).to.deep.equal(["a", "b", "c"])
	})
})
