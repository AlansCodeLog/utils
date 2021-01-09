import { expectType, testName } from "@/testing"
import type { IsEmptyArray } from "@/types"


describe(testName(), () => {
	it("[] = boolean", () => {
		const arr: any = []
		type Res = IsEmptyArray<typeof arr>
		expectType<Res, "===", boolean>(true)
	})
	it("[\"A\"] = boolean", () => {
		const arr = ["A"]
		type Res = IsEmptyArray<typeof arr>
		expectType<Res, "===", boolean>(true)
	})
	it("[] as const = true", () => {
		const arr = [] as const
		type Res = IsEmptyArray<typeof arr>
		expectType<Res, "===", true>(true)
	})
	it(":[] = [] = true", () => {
		const arr: [] = []
		type Res = IsEmptyArray<typeof arr>
		expectType<Res, "===", true>(true)
	})
	it("[\"A\"] as const = true", () => {
		const arr = ["A"] as const
		type Res = IsEmptyArray<typeof arr>
		expectType<Res, "===", false>(true)
	})
	it(":[\"A\"] = [\"A\"] = true", () => {
		const arr: ["A"] = ["A"]
		type Res = IsEmptyArray<typeof arr>
		expectType<Res, "===", false>(true)
	})
})
