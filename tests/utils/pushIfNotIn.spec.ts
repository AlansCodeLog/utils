import { describe, expect, it } from "vitest"

import { expectType, pushIfNotIn } from "../../src/index.js"


it("works", () => {
	const arr1 = ["aa", "bb", "bb"]
	const arr2 = ["cc"]
	const arrUnion = pushIfNotIn(arr1, arr2)
	expect(arr1).to.equal(arrUnion)
	expect(arrUnion).to.deep.equal(["aa", "bb", "bb", "cc"])
})

it("optionally de-duplicates", () => {
	const arr1 = ["a", "b", "b"]
	const arr2 = ["c"]
	const arrUnion = pushIfNotIn([], arr1, arr2)
	expect(arr1).to.not.equal(arrUnion)
	expect(arrUnion).to.deep.equal(["a", "b", "c"])
})

it("../../src/types work", () => {
	const arr1 = ["a"] as const
	const arr2 = ["b"] as const
	const arrUnion = pushIfNotIn([], arr1, arr2)
	const merged = [...arr1, ...arr2]
	expectType<typeof arrUnion, "===", typeof merged>(true)
})
