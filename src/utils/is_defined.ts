/** @packageDocumentation @module utils */

export function is_defined<T>(value: T | undefined): value is T {
	return value !== undefined
}

