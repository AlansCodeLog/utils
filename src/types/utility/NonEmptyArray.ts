/** @packageDocumentation @module types */

export type NonEmptyArray<T = any> = [T, ...T[]] | readonly [T, ...T[]]

