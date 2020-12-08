import { expect_type, test_name } from "@/testing"


describe(test_name(), () => {
	it("works with optional keys", () => {
		type Base = { a: string, b?: string }
		expect_type<Base, "===", { a: string }>(false)
		expect_type<Base, "===", { a: string, b: string}>(false)
		expect_type<Base, "===", { a: string, c: string}>(false)
		expect_type<Base, "===", { b?: string}>(false)
		expect_type<Base, "===", { a: string, b?: string}>(true)
	})
	it("works with arrays", () => {
		type Base = ["a", { a: string, b?: string }]
		expect_type<Base, "===", [{ a: string, b?: string}]>(false)
		expect_type<Base, "===", ["a", { a: string, b: string}]>(false)
		expect_type<Base, "===", ["a"]>(false)
		expect_type<Base, "===", ["a", { a: string, b?: string}]>(true)
	})
	it("works with arrays (readonly vs not)", () => {
		type Base = readonly ["a"]
		expect_type<Base, "===", ["a"]>(false)
		expect_type<Base, "===", readonly ["a"]>(true)
	})
	it(`works only if resolved type is exactly the same ("a" !== string, but "a" | string === string)`, () => {
		type Base = "a" | "b"
		expect_type<Base, "===", string>(false)
		expect_type<Base, "===", "a">(false)
		expect_type<Base, "===", "a" | "b">(true)

		type Base2 = string
		expect_type<Base2, "===", "a">(false)
		expect_type<Base2, "===", "a" | "b" | string>(true)
		expect_type<Base2, "===", string>(true)
	})
	it(`works with unions`, () => {
		type Base = { a: string } | { a: number }
		// use extends
		expect_type<Base, "===", { a: string | number }>(false)
	})
	it(`works with unions`, () => {
		type Base = { a: string } & { a: number }
		expect_type<Base, "===", {a: never}>(true)
	})
})
