import { keys } from "@/retypes"
import { expectType, testName } from "@/testing"
import type { Keys } from "@/types"
import { expect } from "@tests/chai"


describe(testName(), () => {
	it("works", () => {
		const symA: unique symbol = Symbol("a")
		const obj: { [symA]: string, b: string, 0: string } = {
			[symA]: "a", b: "b", 0: "c",
		}
		const objKeys = keys(obj)
		// should have no type errors
		objKeys.forEach(key => { obj[key] })
		expectType<typeof objKeys, "===", (keyof typeof obj)[]>(true)
		expectType<typeof objKeys, "===", (0 | "b" | typeof symA)[]>(true)
		expectType<Keys<typeof obj>, "===", (keyof typeof obj)[]>(true)
	})
	it("works with Record<string, string>", () => {
		const obj: { a: string } & Record<string, string> = { a: "a" }
		const objKeys = keys(obj)
		// should have no type errors
		objKeys.forEach(key => { obj[key] })
		expectType<typeof objKeys, "===", (keyof typeof obj)[]>(true)
		expectType<typeof objKeys, "===", string[]>(true)
		expectType<Keys<typeof obj>, "===", (keyof typeof obj)[]>(true)
	})
	it("does \"not\" work with {[key:string]}", () => {
		// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
		const obj: { [key: string]: string } = { a: "a" }
		const objKeys = keys(obj)
		// should have no type errors
		objKeys.forEach(key => { obj[key] })

		expectType<typeof objKeys, "===", (keyof typeof obj)[]>(true)
		expectType<typeof objKeys, "===", (string | number)[]>(true)
		expectType<Keys<typeof obj>, "===", (keyof typeof obj)[]>(true)

		// force extract only strings
		expectType<Keys<typeof obj, string>, "===", string[]>(true)

		const objKeys2 = keys<string>(obj)
		objKeys2.forEach(key => { obj[key] })
		expectType<typeof objKeys2, "===", string[]>(true)
	})
	it("sort of works with arrays", () => {
		const obj = ["a", "b", "c"]
		const objKeys = keys(obj)
		// should have no type errors
		objKeys.forEach(key => { obj[key] })
		expect(objKeys).to.deep.equal(["0", "1", "2"])
		expectType<typeof objKeys, "===", number[]>(true)
		expectType<Keys<typeof obj>, "===", number[]>(true)
	})
})
