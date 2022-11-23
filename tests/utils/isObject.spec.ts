import { testName } from "@/testing"
import { isObject } from "@/utils"



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
