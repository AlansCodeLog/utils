/**
 * To indicate the code path is unreachable.
 *
 * @param prefixMessage Prefix the default message instead. It will be joined like `${prefixMessage}\n${message}`
 *
 * @param message Override the default message "This error should never happen, please file a bug report."
 */
export function unreachable(
	prefixMessage?: string,
	message: string = `This error should never happen, please file a bug report.`
): never {
	if (prefixMessage) {
		message = `${prefixMessage}\n${message}`
	}
	throw new Error(message)
}
