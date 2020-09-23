/** @packageDocumentation @module utils */

/**
 * Returns true if value is a plain object (and not null or an array). Unlike {@link is_object} this will return false if the value is a class instance or something like Map, Set, etc.
 */
export function is_plain_object<T extends Record<string, any>>(value: T | any): value is T {
	return typeof value === "object" && value !== null && !Array.isArray(value) && value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype
}
