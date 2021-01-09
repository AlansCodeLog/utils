/**
 * To indicate the code path is unreachable.
 *
 * @param message Override the default message "This error should never happen, please file a bug report."
 */
export function unreachable(message: string = `This error should never happen, please file a bug report.`): never {
	throw new Error(message)
}
