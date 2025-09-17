// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { isPlainObject } from "./isPlainObject.js"
/**
 * Returns true if value is an object (and not null or an array). Note that this will return true for class instances (use {@link isPlainObject} to check for only plain objects).
 */
export function isObject<T extends Record<string, any>>(value: T | any): value is T {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}
