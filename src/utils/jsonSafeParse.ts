import { Result } from "./Result.js"

export function jsonSafeParse<T>(
	json: string,
): Result<T, Error> {
	try {
		return Result.Ok(JSON.parse(json))
	} catch (err) {
		return Result.Err(err as any)
	}
}
