import { describe, expect, it } from "vitest"

import { snippet } from "../../src/index.js"
import { testName } from "../../src/testing/index.js"


describe(testName(), () => {
	it("___", () => {
		expect(snippet("   ")).to.equal("")
	})
	it("\\n\\n\\n", () => {
		expect(snippet("\n\n\n", { lines: 3 })).to.equal("")
	})
	it("One two three. ", () => {
		const text = "One two three. "
		expect(snippet(text, { chars: 15 })).to.equal("One two three.")
		expect(snippet(text, { chars: 14 })).to.equal("One two three.")
		expect(snippet(text, { chars: 13 })).to.equal("One two...")
		expect(snippet(text, { chars: 13, ellipses: false })).to.equal("One two")
		expect(snippet(text, { chars: 10 })).to.equal("One two...")
		expect(snippet(text, { chars: 9 })).to.equal("One...")
		expect(snippet(text, { chars: 7, ellipses: false })).to.equal("One two")
		expect(snippet(text, { chars: 4 })).to.equal("One...")
		expect(snippet(text, { chars: 3, ellipses: false })).to.equal("One")
		expect(snippet(text, { chars: 0 })).to.equal("One...")
		expect(snippet(text, { chars: 0, ellipses: false })).to.equal("One")
	})
	it("One\\ntwo\\nthree.\\n", () => {
		const text = "One\ntwo\nthree.\n"
		expect(snippet(text, { chars: 15 })).to.equal("One\ntwo\nthree.")
		expect(snippet(text, { chars: 14 })).to.equal("One\ntwo\nthree.")
		expect(snippet(text, { chars: 13 })).to.equal("One\ntwo")
		expect(snippet(text, { chars: 7 })).to.equal("One\ntwo")
		expect(snippet(text, { chars: 6 })).to.equal("One")
		expect(snippet(text, { chars: 0 })).to.equal("One...")
	})
	it("One. and One", () => {
		expect(snippet("One.", { chars: 0 })).to.equal("One.")
		expect(snippet("One", { chars: 0 })).to.equal("One")
		expect(snippet("One.", { chars: 0, ellipses: false })).to.equal("One.")
		expect(snippet("One", { chars: 0, ellipses: false })).to.equal("One")
	})
	it("1\\n\\n\\n2", () => {
		// duplicate lines are removed
		expect(snippet("1\n\n\n2", { chars: 3 })).to.equal("1\n2")
		expect(snippet("1\n\n\n2")).to.equal("1\n2")
		expect(snippet("1\n\n\n2", { chars: 3, ellipses: false })).to.equal("1\n2")
		expect(snippet("1\n\n\n2", { ellipses: false })).to.equal("1\n2")
	})
})
