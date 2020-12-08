/** @packageDocumentation @module types */

export type MakeOptional<T, TKey extends keyof T> = Omit<T, TKey> & Partial<Pick<T, TKey>>
