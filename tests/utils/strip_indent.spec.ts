import { expect } from "chai"

import { test_name } from "@/testing"
import { strip_indent } from "@/utils"


const space = " "
const tab = "\t"

describe(test_name(), () => {
	it("works", () => {
		let str =
`	1
		2`
		expect(strip_indent(str)).to.equal(
`1
	2`
		)
	})
	it("works when there are spaces after the tabs", () => {
		let str =
`	${space}1
	2`
		expect(strip_indent(str)).to.equal(
`${space}1
2`
		)
	})
	it("works when there are tabs after spaces when tabs = false", () => {
		let str =
` ${tab}1
 2`
		expect(strip_indent(str, { tabs: false })).to.equal(
`${tab}1
2`
		)
	})
	it("works (when min indent is last)", () => {
		let str =
`		1
	2`
		expect(strip_indent(str)).to.equal(
`	1
2`
		)
	})
	it("works with spaces", () => {
		let str =
` 1
  2`
		expect(strip_indent(str, { tabs: false })).to.equal(
`1
 2`
		)
	})
	it("forced indent count (tabs <= than min)", () => {
		let str =
`	1
		2`
		expect(strip_indent(str, { count: 1 })).to.equal(
`1
	2`
		)
	})
	it("forced indent count (tabs > than min)", () => {
		let str =
`	1
		2`
		expect(strip_indent(str, { count: 2 })).to.equal(
`1
2`
		)
	})
	it("forced indent count count = Infinity", () => {
		let str =
`								1
													2`
		expect(strip_indent(str, { count: Infinity })).to.equal(
`1
2`
		)
	})
	describe("does not replace anything when", () => {
		it("the minimum indent = 0", () => {
			let str =
`1
2`
			expect(strip_indent(str)).to.equal(str)
		})
		it("tabs = true and input indented with spaces", () => {
			let str =
` 1
 2`
			expect(strip_indent(str, { tabs: true })).to.equal(str)
		})
		it("tabs = false and input indented with tabs", () => {
			let str =
`	1
		2`
			expect(strip_indent(str, { tabs: false })).to.equal(str)
		})
	})
})
