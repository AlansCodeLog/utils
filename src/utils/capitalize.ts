/**
 * Simple capitalize function. Not exhaustive, at all.
 *
 * Meant for internal use, parsing data that is known not to have any non a-z characters, etc.
 */
export function capitalize(word: string): string {
	return word.charAt(0).toUpperCase() + word.slice(1)
}
