/** @packageDocumentation @module retypes */

import type { Keys } from "@/types"

/**
 * Because 99.999999999999% of the time we *don't* want the default typescript behavior of typing the keys as string[].
 *
 * #awaiting [Exact Types](https://github.com/microsoft/TypeScript/issues/12936) to save us from this pain.
 */
export const keys = Object.keys as <T>(o: T) => Keys<T>
