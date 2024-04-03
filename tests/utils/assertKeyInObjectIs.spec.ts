import { describe, expect, it } from "vitest"

import { assertKeyInObjectIs } from "../../src/utils/assertKeyInObjectIs.js"
import { expectType } from "../../src/utils/expectType.js"


it("works", () => {
	expect(() => {
		assertKeyInObjectIs({ a: true }, "a", false)
	}).to.throw()
})
// not possible in typescript yet
it.todo("types work", () => {
	type BaseType = { a?: "true" }
	const obj: BaseType = { a: "true" } as any
	// expectType<typeof obj, "===", BaseType>(true)
	assertKeyInObjectIs(obj, "a", "true")
	// expectType<typeof obj.a, "===", {a: "true"}>(true)
})
