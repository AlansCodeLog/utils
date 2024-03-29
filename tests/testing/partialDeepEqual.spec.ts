import { inspectError, partialDeepEqual, testName } from "index.js"
import { chai, describe, expect, it } from "vitest"


chai.use(partialDeepEqual)

describe(testName(), () => {
	it("works", () => {
		expect({ a: "a", b: "b" }).to.partial.deep.equal({ a: "a" })
		expect({ a: "a", b: "b" }).to.not.partial.deep.equal({ a: undefined })
		expect({ a: "a", b: "b" }).to.partial.deep.equal({})
		expect({ a: undefined, b: "b" }).to.partial.deep.equal({ a: undefined })
		expect({ a: "a", b: "b" }).to.not.partial.deep.equal({ a: undefined })
	})
})
