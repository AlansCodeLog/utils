import { expect } from "@tests/chai"
import { expectType } from "ts-expect"

import { test_name } from "@/testing"
import { crop, indent, pretty } from "@/utils"


const obj = { a: "a", b: "b", c: "c" }
describe(test_name(), () => {
	it("works", () => {
		expect(indent(pretty(obj), 3)).to.equal(
			`{
				"a": "a",
				"b": "b",
				"c": "c"
			}`)
	})
	it("works in realistic use cases", () => {
		let message = crop`
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
		let message2 = crop`
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
