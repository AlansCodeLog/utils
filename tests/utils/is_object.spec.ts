import { expect } from "@tests/chai"

import { test_name } from "@/testing"
import { is_object } from "@/utils"


class Animal { }

describe(test_name(), () => {
	it("works", () => {
		expect(is_object("")).to.equal(false)
		expect(is_object([""])).to.equal(false)
		expect(is_object({ a: "a" })).to.equal(true)
		expect(is_object(new Animal())).to.equal(true)
		expect(is_object(new Map())).to.equal(true)
	})
})
