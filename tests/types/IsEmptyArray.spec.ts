import { expect } from "chai"
import { expectType, TypeEqual } from "ts-expect"

import { test_name } from "@/testing"
import type { IsEmptyArray } from "@/types"


describe(test_name(), () => {
	it("[] = boolean", () => {
		let arr: any = []
		type Res = IsEmptyArray<typeof arr>
		expectType<TypeEqual<Res, boolean>>(true)
	})
	it("[\"A\"] = boolean", () => {
		let arr = ["A"]
		type Res = IsEmptyArray<typeof arr>
		expectType<TypeEqual<Res, boolean>>(true)
	})
	it("[] as const = true", () => {
		let arr = [] as const
		type Res = IsEmptyArray<typeof arr>
		expectType<TypeEqual<Res, true>>(true)
	})
	it(":[] = [] = true", () => {
		let arr: [] = []
		type Res = IsEmptyArray<typeof arr>
		expectType<TypeEqual<Res, true>>(true)
	})
	it("[\"A\"] as const = true", () => {
		let arr = ["A"] as const
		type Res = IsEmptyArray<typeof arr>
		expectType<TypeEqual<Res, false>>(true)
	})
	it(":[\"A\"] = [\"A\"] = true", () => {
		let arr: ["A"] = ["A"]
		type Res = IsEmptyArray<typeof arr>
		expectType<TypeEqual<Res, false>>(true)
	})
})
