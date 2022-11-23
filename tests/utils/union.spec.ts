import { testName } from "@/testing"
import { union } from "@/utils"


describe(testName(), () => {
	it("works", () => {
		const arr1 = ["a", "b", "b"]
		const arr2 = ["b", "c"]
		const arrUnion = union(arr1, arr2)
		expect(arr1).to.not.equal(arrUnion)
		expect(arrUnion).to.deep.equal(["a", "b", "c"])
	})
})
