import { testName } from "@/testing"
import { walk } from "@/utils"
import { expect } from "@tests/chai"


describe(testName(), () => {
	it("works", () => {
		const obj = {
			a: "a",
			b: ["b", { c: "c" }],
		}
		const items: any[] = []
		const clone = walk(obj, (el: any) => {items.push(el)})
		expect(clone).to.equal(undefined)
		expect(items).to.deep.equal(["a", "b", "c"])
	})
	it("clones", () => {
		const obj = {
			a: "a",
			b: ["b", { c: "c" }],
		}
		const items: any[] = []
		const clone = walk(obj, (el: any) => el === "a" ? undefined : `${el}-`, { save: true })
		expect(obj).to.deep.equal({
			a: "a",
			b: ["b", { c: "c" }],
		})
		expect(clone).to.deep.equal({
			b: ["b-", { c: "c-" }],
		})
	})
})
