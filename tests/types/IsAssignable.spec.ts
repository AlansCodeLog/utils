import { expect_type, test_name } from "@/testing"


describe(test_name(), () => {
	it("works with optional keys", () => {
		type Base = { a: string, b?: string }
		expect_type<{ a: string }, "==>", Base>(true)
		expect_type<{ a: string, b: string}, "==>", Base>(true)
		expect_type<{ a: string, c: string}, "==>", Base>(true)
		expect_type<{ b?: string}, "==>", Base>(false)
		expect_type<{ a: string, b?: string}, "==>", Base>(true)
	})
	it("works with arrays", () => {
		type Base = ["a", { a: string, b?: string }]
		expect_type<[{ a: string, b?: string}], "==>", Base>(false)
		expect_type<["a", { a: string, b: string}], "==>", Base>(true)
		expect_type<["a"], "==>", Base>(false)
		expect_type<["a", { a: string, b?: string}], "==>", Base>(true)
	})
	it("works with arrays (readonly vs not)", () => {
		type Base = ["a"]
		expect_type<readonly ["a"], "==>", Base>(false)
		expect_type<["a"], "==>", Base>(true)
	})
	it(`works only if resolved type is exactly the same ("a" !== string, but "a" | string === string)`, () => {
		type Base = "a" | "b"
		expect_type<string, "==>", Base>(false)
		expect_type<"a", "==>", Base>(true)
		expect_type<"a" | "b", "==>", Base>(true)

		type Base2 = string
		expect_type<string, "==>", Base2>(true)
		expect_type<"a", "==>", Base2>(true)
		expect_type<"a" | "b", "==>", Base2>(true)
	})
	it(`works with unions`, () => {
		type Base = { a: string } | { a: number }
		// use extends
		expect_type<{ a: string | number }, "==>", Base>(false)
	})
	it(`works with unions`, () => {
		type Base = { a: string } & { a: number }
		expect_type<{a: never, b: string}, "==>", Base>(true)
		expect_type<{}, "==>", Base>(false)
	})
})
