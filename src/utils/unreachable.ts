/** @packageDocumentation @module utils */

/**
 * To indicate the code path is unreachable.
 */
export function unreachable(message: string = `This error should never happen, please file a bug report.`): never {
	throw new Error(message)
}
