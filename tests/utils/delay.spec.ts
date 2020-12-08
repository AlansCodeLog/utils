import { test_name } from "@/testing"
import { delay } from "@/utils"
import { expect } from "@tests/chai"


describe(test_name(), () => {
	it("works with default delay", async done => {
		let start = Date.now()
		await delay()
		let total = Date.now() - start
		expect(total).to.be.at.least(900)
		expect(total).to.be.at.most(1100)
		done()
	})
	it("missing tests", async done => {
		let start = Date.now()
		await delay(2000)
		let total = Date.now() - start
		expect(total).to.be.at.least(1900)
		expect(total).to.be.at.most(2100)
		done()
	})
})
