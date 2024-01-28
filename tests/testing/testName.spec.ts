import path from "path"
import { describe, expect, it } from "vitest"

import { inspectError, testName } from "../../src/testing/index.js"


describe(testName(), () => {
	it("no arguments", () => {
		expect(testName()).to.equal(`testing${path.sep}testName`)
	})
	it("passing __filename works", () => {
		expect(testName({ __filename })).to.equal(`testing${path.sep}testName`)
	})
	// note for these two, their return varies depending on where the test is running, but if they're equal we can be sure they're working without having to mock path.sep
	it("works with windows paths", () => {
		const cwd = process.cwd
		process.cwd = () => "c:\\some-project"
		expect(testName({ __filename: `c:\\some-project\\test\\testing\\testName.spec.ts` })).to.equal(`testing${path.sep}testName`)
		process.cwd = cwd
	})
	it("works with unix paths", () => {
		const cwd = process.cwd
		process.cwd = () => "/c/some-project"
		expect(testName({ __filename: `/c/some-project/test/testing/testName.spec.ts` })).to.equal(`testing${path.sep}testName`)
		process.cwd = cwd
	})
	it("works with nesting off", () => {
		expect(testName({ __filename: path.resolve(__dirname, "folder", "someFile.spec.ts"), nest: false })).to.equal("someFile")
		expect(testName({ __filename: path.resolve(__dirname, "folder", "folder2", "someFile.spec.ts"), nest: false })).to.equal("someFile")
	})
	it("works with test/tests folders", () => {
		expect(testName({ __filename: path.resolve(process.cwd(), "tests", "someFile.spec.ts") })).to.equal("someFile")
		expect(testName({ __filename: path.resolve(process.cwd(), "test", "someFile.spec.ts") })).to.equal("someFile")
	})
	it("throws if it can't find the file in the test/s folder", () => {
		expect(inspectError(() => {
			testName({ __filename: path.resolve(process.cwd(), "notInCorrectFolder", "someFile.spec.ts") })
		})).to.throw()
	})
})
