/** @packageDocumentation @module utils */

export function is_defined<T extends any>(value: T | undefined): value is T {
	return value !== undefined
}

