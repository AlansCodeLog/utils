import { inspect_error, test_name } from "@/testing"
import { expect } from "@tests/chai"


let original_warn = console.warn
let warn = jest.fn((err: string) => {
	expect(err).to.equal(new Error(""))
})
describe(test_name(), () => {
	afterEach(() => {
		warn.mockReset()
		console.warn = original_warn
	})
	it("works", () => {
		console.warn = warn
		expect(inspect_error(() => {
			throw new Error("")
		}, true)).to.throw()
		expect(warn.mock.calls.length).to.equal(1)
	})
	it("works (disabled)", () => {
		console.warn = warn
		expect(inspect_error(() => {
			throw new Error("")
		}, false)).to.throw()
		expect(warn.mock.calls.length).to.equal(0)
	})
})
