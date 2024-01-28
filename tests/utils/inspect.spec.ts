import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { testName } from "../../src/index.js"
import { inspect } from "../../src/index_node.js"


describe(testName(), () => {
	let columns: number
	beforeEach(() => { columns = process.stdout.columns })
	afterEach(() => { process.stdout.columns = columns })

	it("works", () => {
		const dashes = "-".repeat(10)
		const dashesExpected = `\u001b[32m'${"-".repeat(10)}'\u001b[39m`
		const expected = `{ a: ${dashesExpected}, b: ${dashesExpected}, c: [ ${dashesExpected} ] }`
		process.stdout.columns = `{ a: '${dashes}', b: '${dashes}', c: [ '${dashes}' ] }`.length
			+ 9 // see index.js/inspect.ts function for why

		const obj = {
			a: dashes,
			b: dashes,
			c: [dashes],
		}
		const log = console.log
		console.log = (item: any) => {
			expect(item).to.equal(expected)
		}
		inspect(obj)
		console.log = log
	})
})
