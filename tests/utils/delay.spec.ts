import { testName } from "@/testing"
import { delay } from "@/utils"
import { expect } from "@tests/chai"


describe(testName(), () => {
	it("works with default delay", async done => {
		const start = Date.now()
		await delay()
		const total = Date.now() - start
		expect(total).to.be.at.least(900)
		expect(total).to.be.at.most(1100)
		done()
	})
	it("missing tests", async done => {
		const start = Date.now()
		await delay(2000)
		const total = Date.now() - start
		expect(total).to.be.at.least(1900)
		expect(total).to.be.at.most(2100)
		done()
	})
})
