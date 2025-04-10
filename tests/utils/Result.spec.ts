import { describe, expect, it } from "vitest"

import { expectType } from "../../src/indexTesting.js"
import { Err, Ok, type Result } from "../../src/utils/Result.js"


it("import works", () => {
	expect(Ok).to.equal(Ok)
})

it("works", () => {
	const ok = Ok("true")
	const err = Err("err")
	expect(ok.isOk).to.equal(true)
	expect(ok.isError).to.equal(false)
	expect(err.isOk).to.equal(false)
	expect(err.isError).to.equal(true)
	if (ok.isOk) {
		expect(ok.value).to.equal("true")
	}
	if (err.isError) {
		expect(err.error instanceof Error).to.equal(true)
	}
})

it("../../src/types work", () => {
	const resOk = Ok()

	if (resOk.isOk) {
		const value = resOk.value
		expectType<typeof value, "===", undefined>(true)
		const error = resOk.error
		expectType<typeof error, "===", never>(true)
	} else {
		const value = resOk.value
		expectType<typeof value, "===", never>(true)
		const error = resOk.error
		expectType<typeof error, "===", never>(true)
	}
	const resErr = Err()

	if (resErr.isOk) {
		const value = resErr.value
		expectType<typeof value, "===", never>(true)
		const error = resErr.error
		expectType<typeof error, "===", never>(true)
	} else {
		const value = resErr.value
		expectType<typeof value, "===", never>(true)
		const error = resErr.error
		expectType<typeof error, "===", Error>(true)
	}

	expectType<typeof resOk, "===", Result<undefined, never>>(true)
	expectType<typeof resErr, "===", Result<never, Error>>(true)
	const res2 = Err()
	expectType<typeof res2, "===", Result<never, Error>>(true)
})

it("works with function return types when using errors with generics", () => {
	class MyError<T extends string> extends Error {
		code: T = "error" as T

		constructor(code: T) {
			super()
			this.code = code
		}
	}
		type ReturnType = Result<number, MyError<"b" | "c">>

		// eslint-disable-next-line @typescript-eslint/naming-convention
		function func(arr: any[]): ReturnType {
			if (arr.includes("a")) return Ok(1)
			if (arr.includes("b")) return Err(new MyError("b"))
			if (arr.includes("c")) return Err(new MyError("c"))
			// @ts-expect-error MyError<"d"> is not assignable to MyError<"b" | "c"> as expected
			return Err(new MyError("d"))
		}
})
