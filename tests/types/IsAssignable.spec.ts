import { describe, expect, it } from "vitest"

import { expectType } from "../../src/utils/expectType.js"


it("works with optional keys", () => {
		type Base = { a: string, b?: string }
		expectType<{ a: string }, "==>", Base>(true)
		expectType<{ a: string, b: string }, "==>", Base>(true)
		expectType<{ a: string, c: string }, "==>", Base>(true)
		expectType<{ b?: string }, "==>", Base>(false)
		expectType<{ a: string, b?: string }, "==>", Base>(true)
})

it("works with arrays", () => {
		type Base = ["a", { a: string, b?: string }]
		expectType<[{ a: string, b?: string }], "==>", Base>(false)
		expectType<["a", { a: string, b: string }], "==>", Base>(true)
		expectType<["a"], "==>", Base>(false)
		expectType<["a", { a: string, b?: string }], "==>", Base>(true)
})

it("works with arrays (readonly vs not)", () => {
		type Base = ["a"]
		expectType<readonly ["a"], "==>", Base>(false)
		expectType<["a"], "==>", Base>(true)
})

it(`works only if resolved type is exactly the same ("a" !== string, but "a" | string === string)`, () => {
		type Base = "a" | "b"
		expectType<string, "==>", Base>(false)
		expectType<"a", "==>", Base>(true)
		expectType<"a" | "b", "==>", Base>(true)

		type Base2 = string
		expectType<string, "==>", Base2>(true)
		expectType<"a", "==>", Base2>(true)
		expectType<"a" | "b", "==>", Base2>(true)
})

it(`works with unions`, () => {
		type Base = { a: string } | { a: number }
		// use extends
		expectType<{ a: string | number }, "==>", Base>(false)
})

it(`works with unions`, () => {
		type Base = { a: string } & { a: number }
		expectType<{ a: never, b: string }, "==>", Base>(true)
		expectType<{}, "==>", Base>(false)
})
