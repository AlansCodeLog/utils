/**
 * Base class for creating a strongly typed error class.
 *
 * This should not be used as is, instead you should extend from it like so with your own error types:
 *
 * ```ts
 * // error types should look something like this
 *
 *	const ERROR = {
 *		SOME_ERROR = "SOME_ERROR"
 *	} as const
 *
 *	// this is just to avoid using enums so we can use typescript's new restricted erasable syntax feature
 *	const ERROR_TYPE = EnumLike<typeof ERROR>
 *
 *	type ALL_ERRORS = ERROR_TYPE // | SOME_OTHER_ERROR_CATEGORY_TYPE
 *
 *	type ERROR_INFO = {
 *		[ERROR.SOME_ERROR]: {
 *			"required": "data"
 *		}
 *	}
 *
 *	export class KnownError<
 *		T extends ALL_ERRORS,
 *		TInfo extends ERROR_INFO[T] = ERROR_INFO[T],
 *	> extends TypedError<T, TInfo> {}
 *
 * // now the contructor is typed
 * const error = new KnownError(ERROR.SOME_ERROR, "message", {
 * 	// type error if missing properties
 * })
 * ```
 */
export class TypedError<
	T extends string,
	TErrorInfo = any,
> extends Error {
	code: T

	info: TErrorInfo

	constructor(
		code: T,
		str: string,
		info: TErrorInfo,
	) {
		super(str)
		this.code = code
		this.info = info
	}
}
