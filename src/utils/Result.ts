/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import type { AnyClass } from "@/types"


abstract class ResultBase<TVal, TErr extends Error> {
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

class OkResult<TVal, TErr extends Error = Error> extends ResultBase<TVal, TErr> {
	value: TVal
	readonly isOk: true = true
	readonly isError: false = false
	constructor(val: TVal) {
		super()
		this.value = val
		if (val instanceof Error) {
			throw new Error("Attempted to construct Ok from Error.")
		}
	}
}

class ErrResult<TVal, TErr extends Error = Error> extends ResultBase<TVal, TErr> {
	error: TErr
	readonly isOk: false = false
	readonly isError: true = true
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
	export function Ok<T = undefined, E extends Error = Error>(val: T = undefined as any as T): Result<T, E> {
		return new OkResult<T>(val) as any
	}

	export function Err<T, E extends Error>(): Result<T, E>
	export function Err<T, E extends Error | string>(type: AnyClass<E>, ...args: ConstructorParameters<AnyClass<E>>): Result<T, E extends Error ? E : Error>
	export function Err<T, E extends Error | string>(val: E): Result<T, E extends Error ? E : Error>
	export function Err(typeOrVal?: Error | string | AnyClass, ...args: any[]) {
		if (typeOrVal === undefined) {
			return new ErrResult(new Error())
		}
		if (typeof typeOrVal === "function") {
			return new ErrResult(new typeOrVal(...args))
		} else {
			return new ErrResult((typeOrVal instanceof Error ? typeOrVal : new Error(typeOrVal)) as any)
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Result<T, E extends Error = Error> =
	| OkResult<T, E>
	| ErrResult<T, E>

