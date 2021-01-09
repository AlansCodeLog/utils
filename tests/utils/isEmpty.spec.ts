import { keys } from "@/retypes/keys"
import { expectType, testName } from "@/testing"
import { isEmpty } from "@/utils"
import { expect } from "@tests/chai"


describe(testName(), () => {
	it("works", () => {
		expect(isEmpty(keys({}))).to.equal(true)
		expect(isEmpty([])).to.equal(true)
		expect(isEmpty(keys({ A: "A" }))).to.equal(false)
		expect(isEmpty(["A"])).to.equal(false)
	})
	describe("types work", () => {
		it("value: any[] = [] ", () => {
			const value: any[] = []
			if (isEmpty(value)) expectType<typeof value, "===", []>(true)
			else expectType<typeof value, "===", any[]>(true)
		})
		it("value = [\"A\"]", () => {
			const value = ["A"]
			if (isEmpty(value)) expectType<typeof value, "===", []>(true)
			else expectType<typeof value, "===", string[]>(true)
		})
		it("value: [] = []", () => {
			const value: [] = []
			if (isEmpty(value)) expectType<typeof value, "===", []>(true)
			else expectType<typeof value, "===", never>(true)
		})
		it("value:  [\"A\"] = [\"A\"]", () => {
			const value: ["A"] = ["A"]
			if (isEmpty(value)) expectType<typeof value, "===", never>(true)
			else expectType<typeof value, "===", ["A"]>(true)
		})
		it("value = [] as const", () => {
			const value = [] as const
			if (isEmpty(value)) expectType<typeof value, "===", readonly []>(true)
			else expectType<typeof value, "===", never>(true)
		})
		it("value = [\"A\"] as const", () => {
			const value = ["A"] as const
			if (isEmpty(value)) expectType<typeof value, "===", never>(true)
			else expectType<typeof value, "===", readonly ["A"]>(true)
		})
	})
})
