import { describe, expect, it } from "vitest"

import { assertInStrRange, inspectError } from "../../src/index.js"


it("throws when out of range", () => {
	expect(inspectError(() => {
		assertInStrRange(-6, "Hello")
	})).to.throw()
	expect(inspectError(() => {
		assertInStrRange(6, "Hello")
	})).to.throw()
})

it("does not throw when in range", () => {
	expect(inspectError(() => {
		assertInStrRange(-5, "Hello")
	})).to.not.throw()
	expect(inspectError(() => {
		assertInStrRange(5, "Hello")
	})).to.not.throw()
})
