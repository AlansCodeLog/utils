import { test_name } from "@/testing"
import { union } from "@/utils"
import { expect } from "@tests/chai"


describe(test_name(), () => {
	it("works", () => {
		let arr1 = ["a", "b", "b"]
		let arr2 = ["b", "c"]
		let arr_union = union(arr1, arr2)
		expect(arr1).to.not.equal(arr_union)
		expect(arr_union).to.deep.equal(["a", "b", "c"])
	})
})
