import { describe, expect, it } from "vitest"

import { isPrimitive } from "../../src/index.js"
import { Animal } from "../helpers/constants.js"


function func(): void {}

it("works", () => {
	expect(isPrimitive("")).to.equal(true)
	expect(isPrimitive(0)).to.equal(true)
	expect(isPrimitive(false)).to.equal(true)
	expect(isPrimitive(true)).to.equal(true)
	expect(isPrimitive(Symbol("a"))).to.equal(true)
	expect(isPrimitive(func)).to.equal(true)
	expect(isPrimitive(null)).to.equal(true)
	expect(isPrimitive(undefined)).to.equal(true)
	expect(isPrimitive([])).to.equal(false)
	expect(isPrimitive({})).to.equal(false)
	expect(isPrimitive(new Animal())).to.equal(false)
})
