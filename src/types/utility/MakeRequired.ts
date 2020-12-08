/** @packageDocumentation @module types */

export type MakeRequired<T, TKey extends keyof T> = Omit<T, TKey> & Required<Pick<T, TKey>>
