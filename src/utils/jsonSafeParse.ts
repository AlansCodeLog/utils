import { Err, Ok, type Result } from "./Result.js"

export function jsonSafeParse<T>(
	json: string,
): Result<T, Error> {
	try {
		return Ok(JSON.parse(json))
	} catch (err) {
		return Err(err as any)
	}
}
