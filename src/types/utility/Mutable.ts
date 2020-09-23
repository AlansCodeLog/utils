/** @packageDocumentation @module types */

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }
