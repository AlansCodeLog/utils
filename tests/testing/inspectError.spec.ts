import { afterEach, describe, expect, it, vi } from "vitest"

import { inspectError, testName } from "../../src/testing/index.js"


const originalWarn = console.warn
const warn = vi.fn((err: string) => {
	expect(err).to.equal(new Error(""))
})
describe(testName(), () => {
	afterEach(() => {
		warn.mockReset()
		console.warn = originalWarn
	})
	it("works", () => {
		console.warn = warn
		expect(inspectError(() => {
			throw new Error("inspectError Works")
		}, true)).to.throw()
		expect(warn.mock.calls.length).to.equal(1)
	})
	it("works (logs when testing with INSPECT_ERRORS set)", () => {
		console.warn = warn
		expect(inspectError(() => {
			throw new Error("inspectError logs only with INSPECT_ERRORS")
		})).to.throw()
		expect(warn.mock.calls.length).to.equal(process.env.INSPECT_ERRORS ? 1 : 0)
	})
	it("works (disabled, should still log with INSPECT_ERRORS set)", () => {
		console.warn = warn
		expect(inspectError(() => {
			throw new Error("inspectError Failed (if logging when INSPECT_ERRORS is false)")
		}, false)).to.throw()
		expect(warn.mock.calls.length).to.equal(process.env.INSPECT_ERRORS ? 1 : 0)
	})
})
