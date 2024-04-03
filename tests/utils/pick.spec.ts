import { describe, expect, it } from "vitest"

import { pick } from "../../src/index.js"


it("works", () => {
	const obj1 = { a: 1, b: 2, c: undefined }
	const picked = pick(obj1, ["a"])
	expect(picked).to.deep.equal({ a: 1 })
	expect(Object.keys(picked)).to.deep.equal(["a"])
})

it("copies undefined key without ignoreUndefined", () => {
	const obj1 = { a: 1, b: 2, c: undefined }
	const picked = pick(obj1, ["c"])
	expect(picked).to.deep.equal({ c: undefined })
	expect(Object.keys(picked)).to.deep.equal(["c"])
})

it("does not copy undefined key with ignoreUndefined", () => {
	const obj1 = { a: 1, b: 2, c: undefined }
	const picked = pick(obj1, ["c"], { ignoreUndefined: true })
	expect(picked).to.deep.equal({ })
	expect(Object.keys(picked)).to.deep.equal([])
})
