import { crop, testName, trimLines } from "../../src/index.js"
import { describe, expect, it } from "vitest"


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
