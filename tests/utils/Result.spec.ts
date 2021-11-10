import { expectType, testName } from "@/testing"
import { Err, Ok, Result } from "@/utils"
import { expect } from "@tests/chai"


describe(testName(), () => {
	it("import works", () => {
		expect(Result.Ok).to.equal(Ok)
	})
	it("types work", () => {
		const res = Ok()

		if (res.isOk) {
			const value = res.value
			// @ts-expect-error should be missing
			const error = res.error
		} else {
			// @ts-expect-error should be missing
			const value = res.value
			const error = res.error
		}
		const ok = Ok("true")
		const err = Err("err")
		expect(ok.isOk).to.equal(true)
		expect(ok.isErr).to.equal(false)
		expect(err.isOk).to.equal(false)
		expect(err.isErr).to.equal(true)
		if (ok.isOk) {
			expect(ok.value).to.equal("true")
		}
		if (err.isErr) {
			expect(err.error instanceof Error).to.equal(true)
		}
		expectType<typeof res, "===", Result<undefined, Error>>(true)
		const res2 = Err()
		expectType<typeof res2, "===", Result<unknown, Error>>(true)
	})
	it("works with custom errors", () => {
		class KnownError extends Error {
			code: number
			constructor(
				message: string,
				code: number
			) {
				super(message)
				this.code = code
			}
		}
		const built = Err(KnownError, "Oh no! Something went wrong.", 1)
		const manual = Err(new KnownError("Oh no! Something went wrong.", 1))
		expectType<typeof built, "===", typeof manual>(true)
	})
})
