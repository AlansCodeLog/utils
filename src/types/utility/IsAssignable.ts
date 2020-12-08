/** @packageDocumentation @module types */

/**
 * Returns if the first type is assignable to the second. For a stricter equality check @see IsEqual .
 *
 * For testing.
 */
export type IsAssignable<T, TOther> = T extends TOther ? true : false
