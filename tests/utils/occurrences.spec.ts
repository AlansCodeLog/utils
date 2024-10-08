import { describe, expect, it } from "vitest"

import { occurrences } from "../../src/index.js"


it("works", () => {
	expect(occurrences("aaa", "a")).to.equal(3)
	expect(occurrences("a a a", "a")).to.equal(3)
	expect(occurrences("aaa", "aa", { overlapping: true })).to.equal(2)
	expect(occurrences("aaa", "aa", { overlapping: false })).to.equal(1)
})
