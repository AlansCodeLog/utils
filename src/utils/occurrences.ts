/**
 * Counts the number of times a substring occurs in the given string.
 *
 * Does not count overlapping matches by default but can be enabled with the `overlapping` option.
 */
export function occurrences(input: string, substring: string,
	{ overlapping = false }: {
		/**
		 * Whether to count overlapping matches, false by default.
		 * ```ts
		 * occurrences("aaa", "aa") // overlapping false
		 * // aaa
		 * // __
		 * // ^matches
		 * //   ^moves to end of match and finds no further matches
		 *
		 * occurrences("aaa", "aa", { overlapping:true })
		 * //aaa
		 * //__
		 * //^matches
		 * // ^moves 1 character forward
		 * // __
		 * // ^matches
		 * //  ^moves 1 character forward and finds no further matches
		 * ```
		 */
		overlapping?: boolean
	} = {}): number {
	let count = 0
	let next = 0
	let match = input.indexOf(substring, 0)
	while (match !== -1) {
		next = overlapping ? match + 1 : match + substring.length
		match = input.indexOf(substring, next)
		count++
	}
	return count
}
