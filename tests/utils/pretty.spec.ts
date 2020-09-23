import { expect } from "chai"

import { test_name } from "@/testing"
import { crop, pretty, strip_indent, trim_lines } from "@/utils"

import { complex_obj } from "../test_helpers/constants"


const test1 = (...args1: any) => (...args2: any) => console.log(args1, args2)
test1`one${undefined}`


describe(test_name(), () => {
	it("works", () => {
		expect(pretty(complex_obj)).to.equal(JSON.stringify(complex_obj, null, "\t"))
		expect(pretty(complex_obj)).to.equal(crop`
			{
				"0": 0,
				"a": "a",
				"c": {
					"c": "c"
				},
				"d": [
					"d"
				],
				"e": {},
				"f": [],
				"j": {},
				"k": true,
				"l": false,
				"m": null
			}
		`)
	})
	it("stringify = true", () => {
		expect(pretty(complex_obj, { stringify: true })).to.equal(crop`
			{
				"0": 0,
				"a": "a",
				"b": "Symbol(b)",
				"c": {
					"c": "c"
				},
				"d": [
					"d"
				],
				"e": {},
				"f": [],
				"g": "function g() {}",
				"h": "() => {}",
				"i": "class Animal {}",
				"j": {},
				"k": true,
				"l": false,
				"m": null
			}
		`)
	})
	it("stringify = custom", () => {
		expect(pretty(complex_obj, {
			stringify: el => ["function", "object", "symbol"].includes(typeof el) ? undefined : el,
		})).to.equal(crop`
			{
				"0": 0,
				"a": "a",
				"k": true,
				"l": false
			}
		`)
	})
})
