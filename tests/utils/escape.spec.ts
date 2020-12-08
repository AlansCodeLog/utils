import { test_name } from "@/testing"
import { escape } from "@/utils"
import { expect } from "@tests/chai"


describe(test_name(), () => {
	it("works", () => {
		let str = "-/\\^$*+?.()|[]{}"
		expect(escape(str)).to.equal(`\\${str.split("").join("\\")}`)
	})
})
