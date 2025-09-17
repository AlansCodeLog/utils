// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { inspectError } from "./inspectError.js"
/**
 * Similar to {@link inspectError}, but returns the error instead and throws if the function does not throw.
 *
 * This makes it easy to check parts of an error are correct.
 *
 * ```ts
 * const error = catchError(funcThatThrows)
 *
 * expect(error.message).to.include(...)
 * // using the chai partialDeepEqual plugin:
 * expect(error).to.partial.deep.equal({code: 1, type:"SOME_TYPE"})
 * ```
 *
 * @testutil
 */
export function catchError(func: (...args: any[]) => any): any {
	try {
		func()
	} catch (e: unknown) {
		return e
	}
	throw new Error("Expected Function to Throw")
}
