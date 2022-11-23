/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-namespace */


abstract class ResultBase<TVal, TErr extends Error | never> {
	unwrap(): TVal {
		const self: Result<TVal, TErr> = this as any
		if (self.isOk) {
			return self.value
		} else {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw self.error
		}
	}
}

class OkResultImpl<TVal> extends ResultBase<TVal, never> {
	value: TVal
	readonly isOk: true = true as const
	readonly isError: false = false as const
	constructor(val: TVal) {
		super()
		this.value = val
		if (val instanceof Error) {
			throw new Error("Attempted to construct Ok from Error.")
		}
	}
}

class ErrResultImpl<TErr extends Error = Error> extends ResultBase<never, TErr> {
	error: TErr
	readonly isOk: false = false as const
	readonly isError: true = true as const
	constructor(val: TErr) {
		super()
		this.error = val
	}
}

/**
 * Barebones result monad.
 *
 * ```ts
 * import { Result, Ok, Err } from "@alanscodelog/utils"
 *
 * // you can also access Ok and Err like Result.Ok and Result.Err
 *
 * function compute(x?: string): Result<string, Error> {
 * 	return x
 * 		? Ok(x)
 * 		// error automatically constructed from string.
 * 		: Err("Oh no! Something went wrong.")
 * }
 *
 * const res = compute("a")
 *
 * if (res.isOk) {
 * 	const value = res.value // string
 * 	const error = res.error // error! property doesn't exist
 * } else {
 * 	const value = res.value // error! property doesn't exist
 * 	const error = res.error //	error instance
 * }
 *
 * // with custom error
 *
 * class KnownError extends Error {
 * 	code: number
 * 	constructor(
 * 		message: string,
 * 		code: number
 * 	) {
 * 		super(message)
 * 		this.code = code
 * 	}
 * }
 *
 * function compute(x?: string): Result<string, KnownError> {
 * 	return x
 * 		? Ok(x)
 * 		// error automatically constructed from error class with parameters checked
 * 		: Err(KnownError, "Oh no! Something went wrong.", 1)
 * 		// equivilant of:
 * 		// : Err(new KnownError("Oh no! Something went wrong.", 1))
 * }
 *
 *
 * const value = Ok("value").unwrap() // "value"
 * const value = Err("Err").unwrap() // will throw
 *
 * ```
 */


export namespace Result {
	export function Ok<T = undefined>(val: T = undefined as any as T): Result<T, never> {
		return new OkResultImpl<T>(val) as any
	}
	export type OkResult<T = undefined> = OkResultImpl<T>
	export type ErrResult<E extends Error = Error> = ErrResultImpl<E>

	export function Err<E extends Error>(): Result<never, E>
	export function Err<E extends Error | string>(val: E): Result<never, E extends Error ? E : Error>
	export function Err(typeOrVal?: Error | string): Result<never, Error> {
		if (typeOrVal === undefined) {
			return new ErrResultImpl(new Error())
		}
		return new ErrResultImpl((typeOrVal instanceof Error ? typeOrVal : new Error(typeOrVal)) as any)
	}
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Result<T, E extends Error = Error> =
	| OkResultImpl<T>
	| ErrResultImpl<E>
