import { testName } from "@/testing"
import type { ErrorW } from "@/types"
import { run } from "@/utils/run"
import { expect } from "@tests/chai"


describe(testName(), () => {
	it("works", async () => {
		const res = await run("echo Success!")
		expect(res.replace(/\r\n/g, "\n")).to.equal("Success!\n")
	})
	it("captures exit code as error code", async () => {
		const res = await run("node tests/_helpers/exitWithCode2.js")
			.catch(err => err as ErrorW<{ code: number }>)
		expect((res as ErrorW<{ code: number }>).code).to.equal(2)
	})
})
