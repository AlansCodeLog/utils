import { describe, expect, it } from "vitest"

import { crop, trimLines } from "../../src/index.js"
import { testName } from "../../src/testing/index.js"


const space = " "

describe(testName(), () => {
	it("works", () => {
		expect(crop`



			Some message.




		`).to.equal(`Some message.`)
	})
	it("only applies trimLines if message is indented with spaces", () => {
		expect(crop`
 Some message.
		`).to.equal(trimLines(`
 Some message.
		 `))
	})
})
