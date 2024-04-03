import { describe, expect, it } from "vitest"

import { walk } from "../../src/index.js"


it("works", () => {
	const obj = {
		a: "a",
		b: ["b", { c: "c" }],
	}
	const items: any[] = []
	const clone = walk(obj, (el: any, keyPath) => {items.push([el, keyPath.join(".")])})
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

it("clones without walker", () => {
	const obj = {
		a: "a",
		b: ["b", { c: "c" }],
	}
	const items: any[] = []
	const clone = walk(obj, undefined, { save: true })
	expect(clone).to.deep.equal({
		a: "a",
		b: ["b", { c: "c" }],
	})
	expect(clone).to.not.equal(obj)
	expect(clone.b).to.not.equal(obj.b)
	expect(clone.b[1]).to.not.equal(obj.b[1])
})

it("before - cb gets called with original object", () => {
	const obj = {
		prop: {},
	}
	let count = 0
	walk(obj, (val, keypath) => {
		if (keypath.join(".") === "prop") {
			count++
			expect(val).to.equal(obj.prop)
		}
	}, { before: true })
	expect(count).to.equal(1)
})

it("save + after - cb gets called with cloned object", () => {
	const obj = {
		prop: {},
	}
	const items: any[] = []
	let count = 0
	walk(obj, (val, keypath) => {
		if (typeof val === "object") {
			if (keypath.join(".") === "prop") {
				count++
				expect(val).to.not.equal(obj.prop)
			}
		}
	}, { after: true, save: true })
	expect(count).to.equal(1)
})

it("after - val is undefined without save", () => {
	const obj = {
		prop: {},
	}
	const items: any[] = []
	let count = 0
	walk(obj, (val, keypath) => {
		if (keypath.length === 0) {
			count++
			expect(val).to.equal(undefined)
		}
	}, { after: true })
	expect(count).to.equal(1)
})

it("save + before + after => after can see change by before", () => {
	const obj = {
		prop: {},
	}
	const customProp = { custom: "prop" }
	const items: any[] = []
	const seen: any = {}
	let count = 0
	const clone = walk(obj, (val, keypath) => {
		if (typeof val === "object") {
			const keys = keypath.join(".")
			// before
			if (keys === "prop" && !seen[keys]) {
				seen[keys] = true
				return customProp
			}
			// after
			if (seen[keys]) {
				count++
				expect(val).to.deep.equal(customProp)
				return val
			}
		}
		return val
	}, { before: true, after: true, save: true })
	expect(clone.prop).to.deep.equal(customProp)
	expect(count).to.equal(1)
})

it.skip("works with circular references", () => {
	const obj = {
		a: "a",
		b: {},
	}
	obj.b = obj
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
