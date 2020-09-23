/** @packageDocumentation @module types */

export type NonEmptyArray<T extends any = any> = [T, ...T[]] | readonly [T, ...T[]]

