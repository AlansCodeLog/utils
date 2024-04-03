import { describe, expect, it } from "vitest"

import { changeObjectKeys } from "../../src/utils/changeObjectKeys.js"


it("renames keys with a function", () => {
	const obj = { helloWorld: "hello" }
	const expected = { HELLOWORLD: "hello" }

	const changedObj = changeObjectKeys(obj, key => key.toUpperCase())

	expect(changedObj).toEqual(expected)
})

it("preserves values", () => {
	const obj = { foo: 1, bar: "baz" }
	const expected = { FOO: 1, BAR: "baz" }

	const changedObj = changeObjectKeys(obj, key => key.toUpperCase())

	expect(changedObj).toEqual(expected)
	expect(changedObj.FOO).toBe(obj.foo) // Test original value is preserved
	expect(changedObj.BAR).toBe(obj.bar) // Test original value is preserved
})
