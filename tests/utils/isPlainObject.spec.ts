import { describe, expect, it } from "vitest"

import { isPlainObject } from "../../src/index.js"
import { testName } from "../../src/testing/index.js"


class Animal { }

describe(testName(), () => {
	it("works", () => {
		expect(isPlainObject("")).to.equal(false)
		expect(isPlainObject(true)).to.equal(false)
		expect(isPlainObject(null)).to.equal(false)
		expect(isPlainObject(undefined)).to.equal(false)
		expect(isPlainObject(() => { })).to.equal(false)
		expect(isPlainObject([""])).to.equal(false)
		expect(isPlainObject(new Animal())).to.equal(false)
		expect(isPlainObject(new Map())).to.equal(false)
		expect(isPlainObject({ a: "a" })).to.equal(true)
	})
})
