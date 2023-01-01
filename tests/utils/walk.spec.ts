import { testName, walk } from "index.js"
import { describe, expect, it } from "vitest"


describe(testName(), () => {
	it("works", () => {
		const obj = {
			a: "a",
			b: ["b", { c: "c" }],
		}
		const items: any[] = []
		const clone = walk(obj, (el: any, keyPath) => {items.push([el, keyPath])})
		expect(clone).to.equal(undefined)
		expect(items).to.deep.equal([["a", "a"], ["b", "b.0"], ["c", "b.1.c"]])
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
	it.todo("works with circular references", () => {
		const obj = {
			a: "a",
			b: {},
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
		const cloneExpected = {
			a: "a-",
			b: {},
		}
		cloneExpected.b = cloneExpected
		expect(clone).to.deep.equal(cloneExpected)
	})
})
