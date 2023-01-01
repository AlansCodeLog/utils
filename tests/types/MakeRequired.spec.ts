import { expectType, testName } from "index.js"
import type { MakeRequired } from "types/index.js"
import { describe, expect, it } from "vitest"


describe(testName(), () => {
	it("works", () => {
		type Base = { a: string, b?: string, c?: { d?: string } }
		type Res = MakeRequired<Base, "c" | "b">
		expectType<Res, "===", { a: string, b: string, c: { d?: string } }>(true)
		expectType<Res, "===", { a: string, b?: string, c?: { d?: string } }>(false)
		expectType<Res, "===", { a: string, b: string, c: { d: string } }>(false)
		expectType<Res, "===", { a: string }>(false)
	})
})

