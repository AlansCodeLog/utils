import { describe, expect, it } from "vitest"

import { expectType, isDefined } from "../../src/index.js"


it("works", () => {
	expect(isDefined(null)).to.equal(true)
	expect(isDefined(undefined)).to.equal(false)
	expect(isDefined("anything")).to.equal(true)
	expect(isDefined({})).to.equal(true)
})

it("../../src/types work", () => {
	let value
	const test = isDefined(value)
	expectType<typeof test, "===", boolean>(true)
	if (isDefined(value)) { expectType<typeof value, "===", undefined>(true) }
	if (!isDefined(value)) { expectType<never, "===", typeof value>(true) }
})
