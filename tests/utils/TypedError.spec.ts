import { describe, expect, it } from "vitest"

import { expectType, Result, TypedError } from "../../src/index.js"


it("works", () => {
	enum ERROR {
		SOME_ERROR = "SOME_ERROR",
		OTHER_ERROR = "OTHER_ERROR",
	}
	// eslint-disable-next-line @typescript-eslint/naming-convention
	type ALL_ERRORS = ERROR

	// eslint-disable-next-line @typescript-eslint/naming-convention
	type ERROR_INFO = {
		[ERROR.SOME_ERROR]: {
			required: "data"
		}
		[ERROR.OTHER_ERROR]: {
			requiredOther: "data"
		}
	}

	class MyKnownError<
		T extends ALL_ERRORS,
		TInfo extends ERROR_INFO[T] = ERROR_INFO[T],
	> extends TypedError<T, TInfo> {

	}
	// this is a common way I use this, am checking there's no type errors
	function _createError<TCheck extends boolean = true>(): Result<TCheck extends true ? true : never,MyKnownError<ERROR.SOME_ERROR>> {
		return Result.Err(new MyKnownError(ERROR.SOME_ERROR, "message", { required: "data" }))
	}

	// @ts-expect-error check it's detecting missing type of error info
	const error = new MyKnownError(ERROR.SOME_ERROR, "message", {})
	const validError = new MyKnownError(ERROR.SOME_ERROR, "message", { required: "data" })

	expectType<typeof validError, "===", MyKnownError<ERROR.SOME_ERROR>>(true)
	expectType<(typeof validError)["info"], "===", ERROR_INFO[ERROR.SOME_ERROR]>(true)
})
