/**
 * Returns if the first type is assignable to the second. For a stricter equality check {@link IsEqual} .
 *
 * For {@link expectType}.
 */
export type IsAssignable<T, TOther> = T extends TOther ? true : false
