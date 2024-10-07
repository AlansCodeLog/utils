import { describe, expect, it } from "vitest"

import { readable } from "../../src/index.js"
import { complexArray } from "../helpers/constants.js"


it("single element array", () => {
	expect(readable(["a"])).to.equal("a")
})

it("two element array", () => {
	expect(readable(["a", "b"])).to.equal("a and b")
})

it("three element array", () => {
	expect(readable(["a", "b", "c"])).to.equal("a, b, and c")
})

it("custom conjunction", () => {
	expect(readable(["a", "b", "c"], { conjunction: "or" })).to.equal("a, b, or c")
})

it("complex array", () => {
	expect(readable(complexArray)).to.equal(`0, a, Symbol(b), {...}, [...], {}, [], e function, anonymous function, Animal function, Animal instance, true, and false`)
})
