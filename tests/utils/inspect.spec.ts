import { expect } from "chai"

import { test_name } from "@/testing"
import { inspect } from "@/utils"


describe(test_name(), () => {
	let columns: number
	beforeEach(() => { columns = process.stdout.columns })
	afterEach(() => { process.stdout.columns = columns })

	it("works", () => {
		let dashes = "-".repeat(10)
		let dashes_expected = `\u001b[32m'${"-".repeat(10)}'\u001b[39m`
		let expected = `{ a: ${dashes_expected}, b: ${dashes_expected}, c: [ ${dashes_expected} ] }`
		process.stdout.columns = `{ a: '${dashes}', b: '${dashes}', c: [ '${dashes}' ] }`.length
			+ 9 // see @/utils/inspect.ts function for why

		let obj = {
			a: dashes,
			b: dashes,
			c: [dashes],
		}
		let log = console.log
		console.log = (item: any) => {
			expect(item).to.equal(expected)
		}
		inspect(obj)
		console.log = log
	})
})
