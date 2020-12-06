import { expect } from "@tests/chai"
import { complex_obj } from "@tests/test_helpers/constants"

import { inspect_error, test_name } from "@/testing"
import { override } from "@/utils"


describe(test_name(), () => {
	it("works", () => {
		let obj1 = { a: 1, b: 2 }
		let obj2 = { c: 3 }
		let merged = override(obj1, obj2)
		expect(merged).to.equal(obj1)
		expect(merged).to.deep.equal({ a: 1, b: 2, c: 3 })
	})
	it("works with arrays when other has array", () => {
		let arr = [1, 2, 3]
		let obj1 = { }
		let obj2 = { arr }
		let merged = override(obj1, obj2)
		expect(merged).to.equal(obj1)
		expect(merged.arr).to.equal(arr)
		expect(merged).to.deep.equal({ arr })
	})
	it("works with arrays when base has array", () => {
		let arr = [1, 2, 3]
		let obj1 = { arr }
		let obj2 = { }
		let merged = override(obj1, obj2)
		expect(merged).to.equal(obj1)
		expect(merged.arr).to.equal(arr)
		expect(merged).to.deep.equal({ arr })
	})
	it("works with arrays when both have an array", () => {
		let arr = [1, 2, 3]
		let obj1 = { arr }
		let obj2 = { arr }
		let merged = override(obj1, obj2)
		expect(merged).to.equal(obj1)
		expect(merged.arr).to.equal(arr)
		expect(merged).to.deep.equal({ arr: [1, 2, 3]})
	})
	it("works with objects when other has object", () => {
		let obj = { deep: "deep" }
		let obj1 = { }
		let obj2 = { obj }
		let merged = override(obj1, obj2)
		expect(merged).to.equal(obj1)
		expect(merged.obj).to.equal(obj)
		expect(merged).to.deep.equal({ obj })
	})
	it("works with objects when base has object", () => {
		let obj = { deep: "deep" }
		let obj1 = { obj }
		let obj2 = { }
		let merged = override(obj1, obj2)
		expect(merged).to.equal(obj1)
		expect(merged.obj).to.equal(obj)
		expect(merged).to.deep.equal({ obj })
	})
	it("works with objects when both have an object", () => {
		let obj = { deep: "deep" }
		let obj1 = { obj }
		let obj2 = { obj }
		let merged = override(obj1, obj2)
		expect(merged).to.equal(obj1)
		expect(merged.obj).to.equal(obj)
		expect(merged).to.deep.equal({ obj })
	})
	it("works with blank object to avoid mutation", () => {
		let obj1 = { a: 1, b: 2 }
		let obj2 = { c: 3 }
		let merged = override({}, obj1, obj2)
		expect(merged).to.not.equal(obj1)
		expect(merged).to.deep.equal({ a: 1, b: 2, c: 3 })
	})
	it("works with blank object to avoid mutation", () => {
		let arr = [1, 2, 3]
		let obj1 = { arr }
		let obj2 = { arr: []}
		let obj3 = { arr: [4]}
		let merged = override({}, obj1, obj2, obj3)
		expect(merged).to.not.equal(obj1)
		expect(merged.arr).to.not.equal(arr)
		expect(merged).to.deep.equal({ arr: [4]})
	})
	it("works with complex base objects with no overriding keys", () => {
		let obj1 = { ...complex_obj }
		let obj2 = { c: 3 }
		let merged = override(obj1, obj2)
		expect(merged).to.equal(obj1)
		expect(merged).to.deep.equal({ ...complex_obj, c: 3 })
	})
	it("does not throw with complex base objects with overriding key", () => {
		let obj1 = { ...complex_obj }
		let obj2 = { j: { deep: "deep" } }
		expect(inspect_error(() => {
			override(obj1, obj2)
		}, false)).to.not.throw()
	})
})
