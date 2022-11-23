import { testName } from "@/testing"
import { isWhitespace } from "@/utils"



describe(testName(), () => {
	it("works", () => {
		expect(isWhitespace("")).to.equal(true)
		expect(isWhitespace("a")).to.equal(false)
		expect(isWhitespace("a   ")).to.equal(false)
		expect(isWhitespace("    ")).to.equal(true)
		expect(isWhitespace("\t\n\r\n")).to.equal(true)
	})
})
