/** @packageDocumentation @module testing */

/**
 * Wrapper to log the errors thrown by functions in tests because test libraries (e.g. jest, test) won't log thrown error messages. Allows inspecting the error message manually if/as needed.
 *
 * The actual logging can be turned on/off with the last parameter or you can force them all on by setting the INSPECT_ERRORS environment variable.
 *
 * ```ts
 * expect(inspect_error(() => {
 * 	throw new Error("")
 * }, true)).to.throw()
 * ```
 */
export function inspect_error(func: (...args: any[]) => any, inspect: boolean = false) {
	return (): void => {
		try {
			func()
		} catch (e: unknown) {
			if (inspect || process.env.INSPECT_ERRORS !== undefined) {
				// eslint-disable-next-line no-console
				console.warn((e as Error).message)
			}
			throw e
		}
	}
}
