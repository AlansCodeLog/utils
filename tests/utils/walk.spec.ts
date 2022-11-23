import { testName } from "@/testing"
import { walk } from "@/utils"



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
	it("works with circular references", () => {
		const obj = {
			a: "a",
			b: {}
		}
		obj.b = obj
		const items: any[] = []
		const clone = walk(obj, (el: any) => `${el}-`, { save: true })

		const expected = {
			a: "a",
			b: {},
		}
		expected.b = expected
		expect(obj).to.deep.equal(expected)
		const clone_expected = {
			a: "a-",
			b: {}
		}
		clone_expected.b = clone_expected
		expect(clone).to.deep.equal(clone_expected)
	})
})
