import { inspect_error, test_name } from "@/testing"
import { unreachable } from "@/utils"
import { expect } from "@tests/chai"


describe(test_name(), () => {
	it("works", () => {
		expect(inspect_error(() => {
			unreachable()
		})).to.throw(`This error should never happen, please file a bug report.`)
	})
	it("works with custom message", () => {
		expect(inspect_error(() => {
			unreachable("message")
		})).to.throw("message")
	})
	it("works with append", () => {
		expect(inspect_error(() => {
			unreachable(undefined, "[repo issues url]")
		})).to.throw(`This error should never happen, please file a bug report: [repo issues url]`)
		expect(inspect_error(() => {
			unreachable("custom message", "[repo issues url]")
		})).to.throw(`custom message [repo issues url]`)
		expect(inspect_error(() => {
			unreachable("custom message.", "[repo issues url]")
		})).to.throw(`custom message: [repo issues url]`)
	})
})
