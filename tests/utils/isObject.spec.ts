import { describe, expect, it } from "vitest"

import { isObject } from "../../src/index.js"
import { testName } from "../../src/testing/index.js"


class Animal { }

describe(testName(), () => {
	it("works", () => {
		expect(isObject("")).to.equal(false)
		expect(isObject([""])).to.equal(false)
		expect(isObject({ a: "a" })).to.equal(true)
		expect(isObject(new Animal())).to.equal(true)
		expect(isObject(new Map())).to.equal(true)
	})
})
