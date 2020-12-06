import { expect } from "@tests/chai"
import { expectType, TypeEqual } from "ts-expect"

import { test_name } from "@/testing"
import type { Primitive } from "@/types"


describe(test_name(), () => {
	it("strings", () => {
		type Test = "a" | "b" | "c"
		expectType<TypeEqual<Primitive<Test>, string>>(true)
	})
	it("numbers", () => {
		type Test = 0 | 1 | 2
		expectType<TypeEqual<Primitive<Test>, number>>(true)
	})
	it("symbols", () => {
		const sym_a = Symbol("a")
		const sym_b = Symbol("b")
		type Test = typeof sym_a | typeof sym_b
		expectType<TypeEqual<Primitive<Test>, symbol>>(true)
	})
	it("booleans", () => {
		type Test = true
		expectType<TypeEqual<Primitive<Test>, boolean>>(true)
		expectType<TypeEqual<Primitive<Test, true>, true>>(true)
	})
})
