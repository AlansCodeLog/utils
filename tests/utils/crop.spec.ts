import { testName } from "@/testing"
import { crop, trimLines } from "@/utils"
import { expect } from "@tests/chai"


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
