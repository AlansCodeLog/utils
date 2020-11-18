/** @packageDocumentation @module retypes */

import type { Keys } from "@/types"

/**
 * Because 99.999999999999% of the time we *don't* want the default typescript behavior of typing the keys as string[].
 *
 * #awaiting [Exact Types](https://github.com/microsoft/TypeScript/issues/12936) to save us from this pain.
 *
 * This is not meant to work with arrays, but it does, returning `number[]` instead.
 *
 * See {@link Keys} for more details (note the order of the type parameters are inverted for this function for convenience, e.g., you'll rarely need to pass the type of the object, it's more likely you'll want to narrow the keys).
 */
export const keys = Object.keys as <
	TKey extends
		string | number | symbol =
		any,
	T extends
		Record<any, any> =
		Record<any, any>
>(o: T) => Keys<T, TKey>

