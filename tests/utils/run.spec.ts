import { testName } from "@/testing"
import type { ErrorW } from "@/types"
import { run } from "@/utils/run"
import { expect } from "@tests/chai"


describe(testName(), () => {
	it("works", async done => {
		const res = await run("echo Success!")
		expect(res).to.equal("Success!\n")
		done()
	})
	it("captures exit code as error code", async done => {
		const res = await run("node tests/_helpers/exitWithCode2.js")
			.catch(err => err as ErrorW<{ code: number }>)
		expect((res as ErrorW<{ code: number }>).code).to.equal(2)
		done()
	})
})
