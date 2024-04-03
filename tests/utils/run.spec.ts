import { describe, expect, it } from "vitest"

import type { RunError } from "../../src/index.js"
import { run } from "../../src/index_node.js"


it("works", async () => {
	const res = await run("echo Success!").promise
	expect(res.replace(/\r\n/g, "\n")).to.equal("Success!\n")
})

it("captures exit code as error code", async () => {
	const res = await run("node tests/_helpers/exitWithCode2.js").promise
		.catch(err => err as RunError)
	expect(res instanceof Error).to.equal(true)
	if (res instanceof Error) {
		expect(res.code).to.equal(2)
	}
})

it("captures complicated stdout/stderr - error even on 0 exit code", async () => {
	const res = await run("node tests/_helpers/writeToStdoutErrAndExit0.js").promise
		.catch(err => err as RunError)
	expect(res instanceof Error).to.equal(true)
	if (res instanceof Error) {
		expect(res.code).to.equal(0)
		expect(res.stderr).to.equal("stderr")
		expect(res.stdout).to.equal("stdoutstdout")
		expect(res.data).to.equal("stdoutstderrstdout")
	}
})
