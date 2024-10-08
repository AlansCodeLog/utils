import { describe, expect, it } from "vitest"

import { get } from "../../src/index.js"


it("works", () => {
	const obj = { a: { b: ["c"]} }
	const value = get(obj, ["a", "b", 0])
	expect(value).to.equal("c")
})
it("returns undefined if value doesn't exist", () => {
	const obj = { a: { b: ["c"]} }
	const value2 = get(obj, ["a", "b", 1])
	expect(value2).to.equal(undefined)
})
it("returns undefined if queried with empty array", () => {
	const obj = { a: { b: ["c"]} }
	const value2 = get(obj, [])
	expect(value2).to.equal(undefined)
})
it("works even if strings used for arrays", () => {
	const obj = { a: { b: ["c"]} }
	const value2 = get(obj, ["a", "b", "0"])
	expect(value2).to.equal("c")
})
