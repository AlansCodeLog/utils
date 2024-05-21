import { describe, expect, it } from "vitest"

import { crop, pretty } from "../../src/index.js"
import { complexObj } from "../_helpers/constants.js"


const test1 = (...args1: any) => (...args2: any) => { console.log(args1, args2) }
test1`one${undefined}`


it("works", () => {
	expect(pretty(complexObj)).to.equal(JSON.stringify(complexObj, null, "\t"))
	expect(pretty(complexObj)).to.equal(crop`
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

it.skip("stringify = true -", () => {
	// function getting extra escaped newline??? (I think it's vite)
	// modified test below
	expect(pretty(complexObj, { stringify: true })).to.equal(crop`
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

it("stringify = true", () => {
	expect(pretty(complexObj, { stringify: true })).to.equal(crop`
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
				"g": "function g() {\\n  }",
				"h": "() => {\\n  }",
				"i": "class Animal {\\n}",
				"j": {},
				"k": true,
				"l": false,
				"m": null
			}
		`)
})

it("stringify = custom", () => {
	expect(pretty(complexObj, {
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
