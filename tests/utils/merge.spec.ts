import { describe, expect, it } from "vitest"

import { inspectError, merge } from "../../src/index.js"
import { complexObj } from "../helpers/constants.js"


it("works", () => {
	const obj1 = { a: 1, b: 2 }
	const obj2 = { c: 3 }
	const merged = merge(obj1, obj2)
	expect(merged).to.equal(obj1)
	expect(merged).to.deep.equal({ a: 1, b: 2, c: 3 })
})

it("works with arrays when other has array", () => {
	const arr = [1, 2, 3]
	const obj1 = { }
	const obj2 = { arr }
	const merged = merge(obj1, obj2)
	expect(merged).to.equal(obj1)
	expect(merged.arr).to.not.equal(arr)
	expect(merged).to.deep.equal({ arr })
})

it("works with arrays when base has array", () => {
	const arr = [1, 2, 3]
	const obj1 = { arr }
	const obj2 = { }
	const merged = merge(obj1, obj2)
	expect(merged).to.equal(obj1)
	expect(merged.arr).to.equal(arr)
	expect(merged).to.deep.equal({ arr })
})

it("works with arrays when both have an array", () => {
	const arr = [1, 2, 3]
	const obj1 = { arr }
	const obj2 = { arr }
	const merged = merge(obj1, obj2)
	expect(merged).to.equal(obj1)
	expect(merged.arr).to.equal(arr)
	expect(merged).to.deep.equal({ arr: [1, 2, 3, 1, 2, 3]})
})

it("works with objects when other has object", () => {
	const obj = { deep: "deep" }
	const obj1 = { }
	const obj2 = { obj }
	const merged = merge(obj1, obj2)
	expect(merged).to.equal(obj1)
	expect(merged.obj).to.not.equal(obj)
	expect(merged).to.deep.equal({ obj })
})

it("works with objects when base has object", () => {
	const obj = { deep: "deep" }
	const obj1 = { obj }
	const obj2 = { }
	const merged = merge(obj1, obj2)
	expect(merged).to.equal(obj1)
	expect(merged.obj).to.equal(obj)
	expect(merged).to.deep.equal({ obj })
})

it("works with objects when both have an object", () => {
	const obj = { deep: "deep" }
	const obj1 = { obj }
	const obj2 = { obj }
	const merged = merge(obj1, obj2)
	expect(merged).to.equal(obj1)
	expect(merged.obj).to.equal(obj)
	expect(merged).to.deep.equal({ obj })
})

it("works with complex base objects with no overriding keys", () => {
	const obj1 = { ...complexObj }
	const obj2 = { c: 3 }
	const merged = merge(obj1, obj2)
	expect(merged).to.equal(obj1)
	expect(merged).to.deep.equal({ ...complexObj, c: 3 })
})

it("throws with complex base objects with overriding key", () => {
	const obj1 = { ...complexObj }
	const obj2 = { j: { deep: "deep" } }
	expect(inspectError(() => {
		merge(obj1, obj2)
	}, false)).to.throw()
})

it("throws trying to merge array with object", () => {
	const obj1 = { }
	const obj2 = [] as any[]
	expect(inspectError(() => {
		merge(obj1, obj2)
	}, false)).to.throw()
	expect(inspectError(() => {
		merge(obj2, obj1)
	}, false)).to.throw()
})
