import { expect } from "chai"

import { test_name } from "@/testing"
import { escape } from "@/utils"


describe(test_name(), () => {
	it("works", () => {
		let str = "-/\\^$*+?.()|[]{}"
		expect(escape(str)).to.equal(`\\${str.split("").join("\\")}`)
	})
})
