/** @packageDocumentation @module types */

import type { DeepRequired } from "./DeepRequired"


type PrimitiveEqual<T, TOther> = [T] extends [TOther] ? [TOther] extends [T] ? true : false : false

/**
 * Returns if true if the two types are EXACTLY equal. For a looser version @see IsAssignable
 *
 * For testing.
 */
export type IsEqual<T, TOther> =
	// "shallow" check
	// this usually works except when we're trying to check optional properties
	// in those cases {a:string} will equal {a:string, b?:string}
	PrimitiveEqual<Resolve<T>, Resolve<TOther>> extends true
		// "deep" check
		// so in those cases we make all the properties not optional and check them
		// we can't just use this because it would fail and say {a:string, b:string} are equal {a:string, b?:string}
		? PrimitiveEqual<DeepRequired<T>, DeepRequired<TOther>> extends true
			? true
			: false
	: false


type Resolve<T> = {
	[K in keyof T]: T[K]
}
