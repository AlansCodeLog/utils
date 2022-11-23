import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { inspect } from "@/node_utils"
import { testName } from "@/testing"


describe(testName(), () => {
	let columns: number
	beforeEach(() => { columns = process.stdout.columns })
	afterEach(() => { process.stdout.columns = columns })

	it("works", () => {
		const dashes = "-".repeat(10)
		const dashesExpected = `\u001b[32m'${"-".repeat(10)}'\u001b[39m`
		const expected = `{ a: ${dashesExpected}, b: ${dashesExpected}, c: [ ${dashesExpected} ] }`
		process.stdout.columns = `{ a: '${dashes}', b: '${dashes}', c: [ '${dashes}' ] }`.length
			+ 9 // see @/utils/inspect.ts function for why

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
