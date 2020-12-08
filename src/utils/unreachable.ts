/** @packageDocumentation @module utils */

/**
 * To indicate the code path is unreachable.
 *
 * @param message Override the default message "This error should never happen, please file a bug report."
 * @param append Append the passed string, replace `.` at the end of message with `: ` if it exists, otherwise just append.
 *
 * Examples:
 * - `This error should never happen, please file a bug report: [append string]`
 * - message = `custom message` => `custom message [append string]`
 */
export function unreachable(message: string = `This error should never happen, please file a bug report.`, append?: string): never {
	if (append) {
		if (message.endsWith(".")) {
			message = `${message.slice(0, -1)}: ${append}`
		} else {
			message = `${message} ${append}`
		}
	}
	throw new Error(message)
}
