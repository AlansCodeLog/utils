import { expect_type, test_name } from "@/testing"
import type { MakeOptional } from "@/types"


describe(test_name(), () => {
	it("works", () => {
		type Base = {a: string, b?: string, c: {d: string}}
		type Res = MakeOptional<Base, "c" | "b">
		expect_type<Res, "===", { a: string, b?: string, c?: {d: string} }>(true)
		expect_type<Res, "===", { a: string, b?: string, c?: {d?: string} }>(false)
		expect_type<Res, "===", { a: string, b: string, c: {d: string} }>(false)
		expect_type<Res, "===", { a: string }>(false)
	})
})

