import { expect } from "@tests/chai"
import { expectType, TypeEqual } from "ts-expect"

import { keys } from "@/retypes/keys"
import { test_name } from "@/testing"
import { is_empty } from "@/utils"


describe(test_name(), () => {
	it("works", () => {
		expect(is_empty(keys({}))).to.equal(true)
		expect(is_empty([])).to.equal(true)
		expect(is_empty(keys({ A: "A" }))).to.equal(false)
		expect(is_empty(["A"])).to.equal(false)
	})
	describe("types work", () => {
		it("value: any[] = [] ", () => {
			let value: any[] = []
			if (is_empty(value)) expectType<TypeEqual<typeof value, []>>(true)
			else expectType<TypeEqual<typeof value, any[]>>(true)
		})
		it("value = [\"A\"]", () => {
			let value = ["A"]
			if (is_empty(value)) expectType<TypeEqual<typeof value, []>>(true)
			else expectType<TypeEqual<typeof value, string[]>>(true)
		})
		it("value: [] = []", () => {
			let value: [] = []
			if (is_empty(value)) expectType<TypeEqual<typeof value, []>>(true)
			else expectType<TypeEqual<typeof value, never>>(true)
		})
		it("value:  [\"A\"] = [\"A\"]", () => {
			let value: ["A"] = ["A"]
			if (is_empty(value)) expectType<TypeEqual<typeof value, never>>(true)
			else expectType<TypeEqual<typeof value, ["A"]>>(true)
		})
		it("value = [] as const", () => {
			let value = [] as const
			if (is_empty(value)) expectType<TypeEqual<typeof value, readonly []>>(true)
			else expectType<TypeEqual<typeof value, never>>(true)
		})
		it("value = [\"A\"] as const", () => {
			let value = ["A"] as const
			if (is_empty(value)) expectType<TypeEqual<typeof value, never>>(true)
			else expectType<TypeEqual<typeof value, readonly ["A"]>>(true)
		})
	})
})
