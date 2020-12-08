import { keys } from "@/retypes/keys"
import { expect_type, test_name } from "@/testing"
import { is_empty } from "@/utils"
import { expect } from "@tests/chai"


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
			if (is_empty(value)) expect_type<typeof value, "===", []>(true)
			else expect_type<typeof value, "===", any[]>(true)
		})
		it("value = [\"A\"]", () => {
			let value = ["A"]
			if (is_empty(value)) expect_type<typeof value, "===", []>(true)
			else expect_type<typeof value, "===", string[]>(true)
		})
		it("value: [] = []", () => {
			let value: [] = []
			if (is_empty(value)) expect_type<typeof value, "===", []>(true)
			else expect_type<typeof value, "===", never>(true)
		})
		it("value:  [\"A\"] = [\"A\"]", () => {
			let value: ["A"] = ["A"]
			if (is_empty(value)) expect_type<typeof value, "===", never>(true)
			else expect_type<typeof value, "===", ["A"]>(true)
		})
		it("value = [] as const", () => {
			let value = [] as const
			if (is_empty(value)) expect_type<typeof value, "===", readonly []>(true)
			else expect_type<typeof value, "===", never>(true)
		})
		it("value = [\"A\"] as const", () => {
			let value = ["A"] as const
			if (is_empty(value)) expect_type<typeof value, "===", never>(true)
			else expect_type<typeof value, "===", readonly ["A"]>(true)
		})
	})
})
