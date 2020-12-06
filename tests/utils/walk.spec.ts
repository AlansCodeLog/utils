import { expect } from "@tests/chai"

import { test_name } from "@/testing"
import { walk } from "@/utils"


describe(test_name(), () => {
	it("works", () => {
		let obj = {
			a: "a",
			b: ["b", { c: "c" }],
		}
		let items: any[] = []
		let clone = walk(obj, (el: any) => {items.push(el)})
		expect(clone).to.equal(undefined)
		expect(items).to.deep.equal(["a", "b", "c"])
	})
	it("clones", () => {
		let obj = {
			a: "a",
			b: ["b", { c: "c" }],
		}
		let items: any[] = []
		let clone = walk(obj, (el: any) => el === "a" ? undefined : `${el}-`, { save: true })
		expect(obj).to.deep.equal({
			a: "a",
			b: ["b", { c: "c" }],
		})
		expect(clone).to.deep.equal({
			b: ["b-", { c: "c-" }],
		})
	})
})
