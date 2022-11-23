import { debounceError } from "./debounce.js"


export function isDebouncedResult(result?: any): boolean {
	return result === debounceError
}
