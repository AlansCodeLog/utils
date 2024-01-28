import { expectType, testName, TypedError } from "../../src/index.js"
import { describe, expect, it } from "vitest"


describe(testName(), () => {
	it("works", () => {
		enum ERROR {
			SOME_ERROR = "SOME_ERROR",
		}
		// eslint-disable-next-line @typescript-eslint/naming-convention
		type ALL_ERRORS = ERROR

		// eslint-disable-next-line @typescript-eslint/naming-convention
		type ERROR_INFO = {
			[ERROR.SOME_ERROR]: {
				"required": "data"
			}
		}

		class MyKnownError<
			T extends ALL_ERRORS,
			TInfo extends ERROR_INFO[T] = ERROR_INFO[T],
		> extends TypedError<T, TInfo> {

		}

		// @ts-expect-error check it's detecting missing type of error info
		const error = new MyKnownError(ERROR.SOME_ERROR, "message", {})
		const validError = new MyKnownError(ERROR.SOME_ERROR, "message", { required: "data" })

		expectType<typeof validError, "===", MyKnownError<ERROR.SOME_ERROR>>(true)
	})
})
