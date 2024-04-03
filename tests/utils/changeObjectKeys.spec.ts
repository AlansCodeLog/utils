import { describe, expect, it } from "vitest"

import { testName } from "../../src/testing/index.js"
import { changeObjKeys } from "../../src/utils/changeObjectKeys.js"


describe(testName(), () => {
	it("renames keys with a function", () => {
		const obj = { helloWorld: "hello" }
		const expected = { HELLOWORLD: "hello" }

		const changedObj = changeObjKeys(obj, key => key.toUpperCase())

		expect(changedObj).toEqual(expected)
	})

	it("preserves values", () => {
		const obj = { foo: 1, bar: "baz" }
		const expected = { FOO: 1, BAR: "baz" }

		const changedObj = changeObjKeys(obj, key => key.toUpperCase())

		expect(changedObj).toEqual(expected)
		expect(changedObj.FOO).toBe(obj.foo) // Test original value is preserved
		expect(changedObj.BAR).toBe(obj.bar) // Test original value is preserved
	})
})
