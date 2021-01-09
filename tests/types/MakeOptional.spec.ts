import { expectType, testName } from "@/testing"
import type { MakeOptional } from "@/types"


describe(testName(), () => {
	it("works", () => {
		type Base = {a: string, b?: string, c: {d: string}}
		type Res = MakeOptional<Base, "c" | "b">
		expectType<Res, "===", { a: string, b?: string, c?: {d: string} }>(true)
		expectType<Res, "===", { a: string, b?: string, c?: {d?: string} }>(false)
		expectType<Res, "===", { a: string, b: string, c: {d: string} }>(false)
		expectType<Res, "===", { a: string }>(false)
	})
})

