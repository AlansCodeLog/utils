import { describe, expect, it } from "vitest"

import { escapeRegex } from "../../src/index.js"


it("works", () => {
	const str = "-/\\^$*+?.()|[]{}"
	expect(escapeRegex(str)).to.equal(`\\${str.split("").join("\\")}`)
})
