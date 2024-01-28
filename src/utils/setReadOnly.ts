import type { Mutable } from "../types/index.js"

/**
 * Allows setting a readonly property of an object with type checking on the value.
 *
 * Useful for setting readonly properties within classes when they should only be readonly to the user.
 */
export function setReadOnly<T, TKey extends keyof T, TMutable extends Mutable<T>>(self: T, key: TKey, value: TMutable[TKey]): void {
	self[key] = value as any
}
