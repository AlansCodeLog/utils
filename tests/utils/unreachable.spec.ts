import { describe, expect, it } from "vitest"

import { inspectError, testName, unreachable } from "../../src/index.js"


describe(testName(), () => {
	it("works", () => {
		expect(inspectError(() => {
			unreachable()
		})).to.throw(`This error should never happen, please file a bug report.`)
	})
	it("works with custom message", () => {
		expect(inspectError(() => {
			unreachable("message")
		})).to.throw("message")
	})
})
