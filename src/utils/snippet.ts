/** @packageDocumentation @module utils */

/**
 * Given some text, a max number of lines, characters, or both, removes duplicate newlines, normalizes them to `\n`, trims start/end, *then* trims the text according to the limits, adding trailing ellipses to the end (as necessary).
 *
 * Ellipses are added if we have to cut at a word that is not the end of a sentence. They are not added if we cut at a line, regardless of how that line ended.
 *
 * Ellipses are included in the chars limit. The only exception is if the character limit is so low that the first word doesn't fit, in which case the character limit is ignored. The first word will be returned instead.
 *
 **/
export function snippet(text: string, {
	lines: max_lines = 5,
	chars: max_chars = 300,
	ellipses = true,
}: {
	lines?: number
	chars?: number
	ellipses?: boolean
} = {}): string {
	if (text === "" || text.trim() === "") { return "" }
	text = text.trim().replace(/(\r?\n)+/gm, "\n")
	// split into lines and reduce to lines
	let until_max_lines = text
		.split(/\r?\n/gm)
		.slice(0, max_lines)
		.join("\n")
		.trimEnd()
	if (until_max_lines.length <= max_chars) return until_max_lines

	let first_word_i = until_max_lines.indexOf(" ")
	first_word_i = first_word_i > 0 ? first_word_i : until_max_lines.indexOf("\n")
	first_word_i = first_word_i > 0 ? first_word_i : until_max_lines.length

	let until_max_chars = until_max_lines.slice(0, max_chars)
	if (until_max_chars.length >= first_word_i) {
		let next_char = until_max_lines.charAt(max_chars)

		if (["", "\n"].includes(next_char) || until_max_chars.endsWith(".") || (!ellipses && next_char === " ")) {
			return until_max_chars.trimEnd()
		}
	} else {
		until_max_chars = until_max_lines.slice(0, first_word_i)
		let next_char = until_max_lines.charAt(first_word_i)
		return until_max_chars + (ellipses && [" ", "\n"].includes(next_char) ? "..." : "")
	}

	let prev_space = until_max_chars.lastIndexOf(" ")
	prev_space = prev_space > 0 ? prev_space : until_max_chars.lastIndexOf("\n")
	let minus_word = until_max_chars.slice(0, prev_space).trimEnd()

	while (prev_space > 0 && (minus_word.length + (!ellipses || minus_word.endsWith(".") || minus_word.endsWith("\n") ? 0 : 3)) > max_chars) {
		prev_space = minus_word.lastIndexOf(" ")
		prev_space = prev_space > 0 ? prev_space : minus_word.lastIndexOf("\n")
		if (prev_space === -1) break
		minus_word = minus_word.slice(0, prev_space).trimEnd()
	}
	let next_char2 = until_max_chars.charAt(prev_space)

	return `${minus_word.trimEnd()}${(!ellipses || minus_word.endsWith(".") || next_char2 === "\n" ? "" : "...")}`
}
