import { describe, expect, it } from "vitest"

import { union } from "../../src/index.js"


it("works", () => {
	const arr1 = ["a", "b", "b"]
	const arr2 = ["b", "c"]
	const arrUnion = union(arr1, arr2)
	expect(arr1).to.not.equal(arrUnion)
	expect(arrUnion).to.deep.equal(["a", "b", "c"])
})
