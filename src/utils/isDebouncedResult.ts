import { debounceError } from "./debounce"


export function isDebouncedResult(result?: any): boolean {
	return result === debounceError
}
