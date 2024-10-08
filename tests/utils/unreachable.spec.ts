import { describe, expect, it } from "vitest"

import { inspectError, unreachable } from "../../src/index.js"


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
