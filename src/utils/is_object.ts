/** @packageDocumentation @module utils */

/**
 * Returns true if value is an object (and not null or an array). Note that this will return true for class instances (use {@link is_plain_object} to check for only plain objects).
 */
export function is_object<T extends Record<string, any>>(value: T | any): value is T {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}
