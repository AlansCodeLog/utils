/**
 * Poor man's unwrap for functions that return errors.
 */
export function throwIfError<T extends any | Error>(maybeError: T): Exclude<T, Error> {
	if (maybeError instanceof Error) throw maybeError
	return maybeError as any
}
