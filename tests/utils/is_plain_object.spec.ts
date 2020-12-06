import { expect } from "@tests/chai"

import { test_name } from "@/testing"
import { is_plain_object } from "@/utils"


class Animal { }

describe(test_name(), () => {
	it("works", () => {
		expect(is_plain_object("")).to.equal(false)
		expect(is_plain_object(true)).to.equal(false)
		expect(is_plain_object(null)).to.equal(false)
		expect(is_plain_object(undefined)).to.equal(false)
		expect(is_plain_object(() => { })).to.equal(false)
		expect(is_plain_object([""])).to.equal(false)
		expect(is_plain_object(new Animal())).to.equal(false)
		expect(is_plain_object(new Map())).to.equal(false)
		expect(is_plain_object({ a: "a" })).to.equal(true)
	})
})
