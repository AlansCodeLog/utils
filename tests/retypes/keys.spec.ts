import { expect } from "chai"
import { expectType, TypeEqual } from "ts-expect"

import { keys } from "@/retypes"
import { test_name } from "@/testing"
import type { Keys } from "@/types"


describe(test_name(), () => {
	it("works", () => {
		let sym_a = Symbol("a")
		let obj = { [sym_a]: "a", b: "b", 0: "c" }
		let obj_keys = keys(obj)
		// should have no type errors
		obj_keys.forEach(key => { obj[key] })
		expectType<TypeEqual<typeof obj_keys, (keyof typeof obj)[]>>(true)
		expectType<TypeEqual<typeof obj_keys, (string|number)[]>>(true)
		expectType<TypeEqual<Keys<typeof obj>, (keyof typeof obj)[]>>(true)
	})
	it("works", () => {
		const sym_a: unique symbol = Symbol("a")
		let obj: { [sym_a]: string, b: string, 0: string } = {
			[sym_a]: "a", b: "b", 0: "c",
		}
		let obj_keys = keys(obj)
		// should have no type errors
		obj_keys.forEach(key => { obj[key] })
		expectType<TypeEqual<typeof obj_keys, (keyof typeof obj)[]>>(true)
		expectType<TypeEqual<typeof obj_keys, (0| "b" |typeof sym_a)[]>>(true)
		expectType<TypeEqual<Keys<typeof obj>, (keyof typeof obj)[]>>(true)
	})
	it("works with Record<string, string>", () => {
		let obj: {a: string} & Record<string, string> = { a: "a" }
		let obj_keys = keys(obj)
		// should have no type errors
		obj_keys.forEach(key => { obj[key] })
		expectType<TypeEqual<typeof obj_keys, (keyof typeof obj)[]>>(true)
		expectType<TypeEqual<typeof obj_keys, string[]>>(true)
		expectType<TypeEqual<Keys<typeof obj>, (keyof typeof obj)[]>>(true)
	})
	it("does \"not\" work with {[key:string]}", () => {
		let obj: {[key: string]: string} = { a: "a" }
		let obj_keys = keys(obj)
		// should have no type errors
		obj_keys.forEach(key => { obj[key] })

		expectType<TypeEqual<typeof obj_keys, (keyof typeof obj)[]>>(true)
		expectType<TypeEqual<typeof obj_keys, (string | number)[]>>(true)
		expectType<TypeEqual<Keys<typeof obj>, (keyof typeof obj)[]>>(true)

		// force extract only strings
		expectType<TypeEqual<Keys<typeof obj, string>, string[]>>(true)

		let obj_keys2 = keys<string>(obj)
		obj_keys2.forEach(key => { obj[key] })
		expectType<TypeEqual<typeof obj_keys2, string[]>>(true)
	})
	it("sort of works with arrays", () => {
		let obj = ["a", "b", "c"]
		let obj_keys = keys(obj)
		// should have no type errors
		obj_keys.forEach(key => { obj[key] })
		expect(obj_keys).to.deep.equal(["0", "1", "2"])
		expectType<TypeEqual<typeof obj_keys, number[]>>(true)
		expectType<TypeEqual<Keys<typeof obj>, number[]>>(true)
	})
})
