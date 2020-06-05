import { expect } from "chai"
import path from "path"

import { inspect_error, test_name } from "@/testing"


describe(test_name(), () => {
	it("no arguments", () => {
		expect(test_name()).to.equal("testing/test_name")
	})
	it("passing __filename works", () => {
		expect(test_name({ __filename })).to.equal("testing/test_name")
	})
	it("works with nesting off", () => {
		expect(test_name({ __filename: path.resolve(__dirname, "folder", "some_file.spec.ts"), nest: false })).to.equal("some_file")
		expect(test_name({ __filename: path.resolve(__dirname, "folder", "folder2", "some_file.spec.ts"), nest: false })).to.equal("some_file")
	})
	it("works with test/tests folders", () => {
		expect(test_name({ __filename: path.resolve(process.cwd(), "tests", "some_file.spec.ts") })).to.equal("some_file")
		expect(test_name({ __filename: path.resolve(process.cwd(), "test", "some_file.spec.ts") })).to.equal("some_file")
	})
	it("throws if it can't find the file in the test/s folder", () => {
		expect(inspect_error(() => {
			test_name({ __filename: path.resolve(process.cwd(), "not_in_correct_folder", "some_file.spec.ts") })
		})).to.throw()
	})
})
