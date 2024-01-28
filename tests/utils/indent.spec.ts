import { describe, expect, it } from "vitest"

import { crop, indent, pretty, testName } from "../../src/index.js"


const obj = { a: "a", b: "b", c: "c" }
describe(testName(), () => {
	it("works", () => {
		expect(indent(pretty(obj), 3)).to.equal(
			`{
				"a": "a",
				"b": "b",
				"c": "c"
			}`)
	})
	it("works in realistic use cases", () => {
		const message = crop`
			Some message:
			${indent(pretty(obj), 3)}
		`

		expect(message).to.equal(crop`
			Some message:
			{
				"a": "a",
				"b": "b",
				"c": "c"
			}
		`)
		const message2 = crop`
			Some message:
				${indent(pretty(obj), 4)}
		`
		expect(message2).to.equal(crop`
			Some message:
				{
					"a": "a",
					"b": "b",
					"c": "c"
				}
		`)
	})
	it("first = true", () => {
		expect(indent(pretty(obj), 3, { first: true })).to.equal(
`			{
				"a": "a",
				"b": "b",
				"c": "c"
			}`)
	})
})
