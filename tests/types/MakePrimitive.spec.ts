import { describe, expect, it } from "vitest"

import type { MakePrimitive } from "../../src/types/index.js"
import { expectType } from "../../src/utils/expectType.js"


it("strings", () => {
	type Test = "a" | "b" | "c"
	expectType<MakePrimitive<Test>, "===", string>(true)
})

it("numbers", () => {
	type Test = 0 | 1 | 2
	expectType<MakePrimitive<Test>, "===", number>(true)
})

it("symbols", () => {
	const symA = Symbol("a")
	const symB = Symbol("b")
	type Test = typeof symA | typeof symB
	expectType<MakePrimitive<Test>, "===", symbol>(true)
})

it("booleans", () => {
	type Test = true
	expectType<MakePrimitive<Test>, "===", boolean>(true)
	expectType<MakePrimitive<Test, true>, "===", true>(true)
})
