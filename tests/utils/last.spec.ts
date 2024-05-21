import { expect, it } from "vitest"

import { last } from "../../src/index.js"


it("works", () => {
	const arr = [1, 2, 3]
	expect(last(arr)).to.equal(3)
	expect(last([])).to.equal(undefined)
})
