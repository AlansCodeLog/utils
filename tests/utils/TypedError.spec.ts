import { describe, expect, it } from "vitest"

import { type EnumLike , Err, expectType, type Result, TypedError } from "../../src/index.js"


it("works", () => {
	const ERROR = {
		SOME_ERROR: "SOME_ERROR",
		OTHER_ERROR: "OTHER_ERROR",
	} as const
	
	// eslint-disable-next-line @typescript-eslint/naming-convention
	type ERROR_ENUM = EnumLike<typeof ERROR>

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
		T extends ERROR_ENUM,
		TInfo extends ERROR_INFO[T] = ERROR_INFO[T],
	> extends TypedError<T, TInfo> {

	}
	// this is a common way I use this, am checking there's no type errors
	function _createError<TCheck extends boolean = true>(): Result<TCheck extends true ? true : never, MyKnownError<typeof ERROR.SOME_ERROR>> {
		return Err(new MyKnownError(ERROR.SOME_ERROR, "message", { required: "data" }))
	}

	// @ts-expect-error check it's detecting missing type of error info
	const error = new MyKnownError(ERROR.SOME_ERROR, "message", {})
	const validError = new MyKnownError(ERROR.SOME_ERROR, "message", { required: "data" })

	expectType<typeof validError, "===", MyKnownError<typeof ERROR.SOME_ERROR>>(true)
	expectType<(typeof validError)["info"], "===", ERROR_INFO[typeof ERROR.SOME_ERROR]>(true)
})
