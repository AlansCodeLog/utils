// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { IsEqual } from "./IsEqual.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { expectType } from "../utils/expectType.js"

/**
 * Returns if the first type is assignable to the second. For a stricter equality check {@link IsEqual} .
 *
 * For {@link expectType}.
 */
export type IsAssignable<T, TOther> = T extends TOther ? true : false
