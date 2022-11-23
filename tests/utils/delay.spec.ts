import { describe, expect, it } from "vitest"

import { testName } from "@/testing"
import { delay } from "@/utils"


describe(testName(), () => {
	it("works with default delay", async () => {
		const start = Date.now()
		await delay()
		const total = Date.now() - start
		expect(total).to.be.at.least(900)
		expect(total).to.be.at.most(1100)
	})
	it("missing tests", async () => {
		const start = Date.now()
		await delay(2000)
		const total = Date.now() - start
		expect(total).to.be.at.least(1900)
		expect(total).to.be.at.most(2100)
	})
})
