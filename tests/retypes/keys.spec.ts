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
		obj_keys.forEach(key => {
			obj[key]
		})
		expectType<TypeEqual<typeof obj_keys, (keyof typeof obj)[]>>(true)
		expectType<TypeEqual<Keys<typeof obj>, (keyof typeof obj)[]>>(true)
	})
	it("sort of works with arrays", () => {
		let obj = ["a", "b", "c"]
		let obj_keys = keys(obj)
		// should have no type errors
		obj_keys.forEach(key => {
			obj[key]
		})
		expect(obj_keys).to.deep.equal(["0", "1", "2"])
		expectType<TypeEqual<typeof obj_keys, number[]>>(true)
		expectType<TypeEqual<Keys<typeof obj>, number[]>>(true)
	})
})
