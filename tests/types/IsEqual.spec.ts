import { describe, expect, it } from "vitest"

import { expectType } from "../../src/utils/expectType.js"


it("works with optional keys", () => {
	type Base = { a: string, b?: string }
	expectType<Base, "===", { a: string }>(false)
	expectType<Base, "===", { a: string, b: string }>(false)
	expectType<Base, "===", { a: string, c: string }>(false)
	expectType<Base, "===", { b?: string }>(false)
	expectType<Base, "===", { a: string, b?: string }>(true)
})

it("works with arrays", () => {
	type Base = ["a", { a: string, b?: string }]
	expectType<Base, "===", [{ a: string, b?: string }]>(false)
	expectType<Base, "===", ["a", { a: string, b: string }]>(false)
	expectType<Base, "===", ["a"]>(false)
	expectType<Base, "===", ["a", { a: string, b?: string }]>(true)
})

it("works with arrays (readonly vs not)", () => {
	type Base = readonly ["a"]
	expectType<Base, "===", ["a"]>(false)
	expectType<Base, "===", readonly ["a"]>(true)
})

it(`works only if resolved type is exactly the same ("a" !== string, but "a" | string === string)`, () => {
	type Base = "a" | "b"
	expectType<Base, "===", string>(false)
	expectType<Base, "===", "a">(false)
	expectType<Base, "===", "a" | "b">(true)

	type Base2 = string
	expectType<Base2, "===", "a">(false)
	expectType<Base2, "===", "a" | "b" | string>(true)
	expectType<Base2, "===", string>(true)
})

it(`works with unions`, () => {
	type Base = { a: string } | { a: number }
	// use extends
	expectType<Base, "===", { a: string | number }>(false)
})

it(`works with unions`, () => {
	type Base = { a: string } & { a: number }
	expectType<Base, "===", { a: never }>(true)
})
