import { expect } from "@tests/chai"

import { test_name } from "@/testing"
import type { ErrorW } from "@/types"
import { run } from "@/utils/run"


describe(test_name(), () => {
	it("works", async done => {
		let res = await run("echo Success!")
		expect(res).to.equal("Success!\n")
		done()
	})
	it("captures exit code as error code", async done => {
		let res = await run("node tests/test_helpers/exit_with_code_2.js")
			.catch(err => err as ErrorW<{code: number}>)
		expect((res as ErrorW<{ code: number }>).code).to.equal(2)
		done()
	})
})
