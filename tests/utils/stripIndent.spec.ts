import { describe, expect, it } from "vitest"

import { stripIndent } from "../../src/index.js"


const space = " "
const tab = "\t"

it("works", () => {
	const str =
`	1
		2`
	expect(stripIndent(str)).to.equal(
`1
	2`
	)
})

it("works when there are spaces after the tabs", () => {
	const str =
`	${space}1
	2`
	expect(stripIndent(str)).to.equal(
`${space}1
2`
	)
})

it("works when there are tabs after spaces when tabs = false", () => {
	const str =
` ${tab}1
 2`
	expect(stripIndent(str, { tabs: false })).to.equal(
`${tab}1
2`
	)
})

it("works (when min indent is last)", () => {
	const str =
`		1
	2`
	expect(stripIndent(str)).to.equal(
`	1
2`
	)
})

it("works with spaces", () => {
	const str =
` 1
  2`
	expect(stripIndent(str, { tabs: false })).to.equal(
`1
 2`
	)
})

it("forced indent count (tabs <= than min)", () => {
	const str =
`	1
		2`
	expect(stripIndent(str, { count: 1 })).to.equal(
`1
	2`
	)
})

it("forced indent count (tabs > than min)", () => {
	const str =
`	1
		2`
	expect(stripIndent(str, { count: 2 })).to.equal(
`1
2`
	)
})

it("forced indent count count = Infinity", () => {
	const str =
`								1
													2`
	expect(stripIndent(str, { count: Infinity })).to.equal(
`1
2`
	)
})

describe("does not replace anything when", () => {
	it("the minimum indent = 0", () => {
		const str =
`1
2`
		expect(stripIndent(str)).to.equal(str)
	})
	it("tabs = true and input indented with spaces", () => {
		const str =
` 1
 2`
		expect(stripIndent(str, { tabs: true })).to.equal(str)
	})
	it("tabs = false and input indented with tabs", () => {
		const str =
`	1
		2`
		expect(stripIndent(str, { tabs: false })).to.equal(str)
	})
})
