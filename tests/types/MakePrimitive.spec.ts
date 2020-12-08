import { expect_type, test_name } from "@/testing"
import type { MakePrimitive } from "@/types"


describe(test_name(), () => {
	it("strings", () => {
		type Test = "a" | "b" | "c"
		expect_type<MakePrimitive<Test>, "===", string>(true)
	})
	it("numbers", () => {
		type Test = 0 | 1 | 2
		expect_type<MakePrimitive<Test>, "===", number>(true)
	})
	it("symbols", () => {
		const sym_a = Symbol("a")
		const sym_b = Symbol("b")
		type Test = typeof sym_a | typeof sym_b
		expect_type<MakePrimitive<Test>, "===", symbol>(true)
	})
	it("booleans", () => {
		type Test = true
		expect_type<MakePrimitive<Test>, "===", boolean>(true)
		expect_type<MakePrimitive<Test, true>, "===", true>(true)
	})
})
