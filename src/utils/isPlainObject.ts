// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { isObject } from "./isObject.js"
/**
 * Returns true if value is a plain object (and not null or an array). Unlike {@link isObject} this will return false if the value is a class instance or something like Map, Set, etc.
 */
export function isPlainObject<T extends Record<string, any>>(value: T | any): value is T {
	return typeof value === "object" && value !== null && !Array.isArray(value) && value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype
}
