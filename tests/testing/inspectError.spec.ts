import { inspectError, testName } from "@/testing"
import { expect } from "@tests/chai"


const originalWarn = console.warn
const warn = jest.fn((err: string) => {
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
			throw new Error("")
		}, true)).to.throw()
		expect(warn.mock.calls.length).to.equal(1)
	})
	it("works (disabled)", () => {
		console.warn = warn
		expect(inspectError(() => {
			throw new Error("")
		}, false)).to.throw()
		expect(warn.mock.calls.length).to.equal(0)
	})
})
