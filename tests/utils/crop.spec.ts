import { expect } from "chai"

import { test_name } from "@/testing"
import { crop, trim_lines } from "@/utils"


const space = " "

describe(test_name(), () => {
	it("works", () => {
		expect(crop`



			Some message.




		`).to.equal(`Some message.`)
	})
	it("only applies trim_lines if message is indented with spaces", () => {
		expect(crop`
 Some message.
		`).to.equal(trim_lines(`
 Some message.
		 `))
	})
})
