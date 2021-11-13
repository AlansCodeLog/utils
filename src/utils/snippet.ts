/**
 * Given some text, a max number of lines, characters, or both, removes duplicate newlines, normalizes them to `\n`, trims start/end, *then* trims the text according to the limits, adding trailing ellipses to the end (as necessary).
 */
export function snippet(text: string, {
	lines: maxLine = 5,
	chars: maxChars = 300,
	ellipses = true,
}: {
	/** Max number of lines (default 5). */
	lines?: number
	/** Max number of chars (ellipses included) (default 300), unless the character limit is so low that the first word doesn't fit, in which case the character limit is ignored. The first word will be returned instead. */
	chars?: number
	/** Whether trailing ellipses are added (default true) if we have to cut at a word that is not the end of a sentence. They are not added if we cut at a line, regardless of how that line ended. */
	ellipses?: boolean
} = {}): string {
	if (text === "" || text.trim() === "") { return "" }
	text = text.trim().replace(/(\r?\n)+/gm, "\n")
	// split into lines and reduce to lines
	const untilMaxLines = text
		.split(/\r?\n/gm)
		.slice(0, maxLine)
		.join("\n")
		.trimEnd()
	if (untilMaxLines.length <= maxChars) return untilMaxLines

	let iFirstWord = untilMaxLines.indexOf(" ")
	iFirstWord = iFirstWord > 0 ? iFirstWord : untilMaxLines.indexOf("\n")
	iFirstWord = iFirstWord > 0 ? iFirstWord : untilMaxLines.length

	let untilMaxChars = untilMaxLines.slice(0, maxChars)
	if (untilMaxChars.length >= iFirstWord) {
		const nextChar = untilMaxLines.charAt(maxChars)

		if (["", "\n"].includes(nextChar) || untilMaxChars.endsWith(".") || (!ellipses && nextChar === " ")) {
			return untilMaxChars.trimEnd()
		}
	} else {
		untilMaxChars = untilMaxLines.slice(0, iFirstWord)
		const nextChar = untilMaxLines.charAt(iFirstWord)
		return untilMaxChars + (ellipses && [" ", "\n"].includes(nextChar) ? "..." : "")
	}

	let prevSpace = untilMaxChars.lastIndexOf(" ")
	prevSpace = prevSpace > 0 ? prevSpace : untilMaxChars.lastIndexOf("\n")
	let minusWord = untilMaxChars.slice(0, prevSpace).trimEnd()

	while (prevSpace > 0 && (minusWord.length + (!ellipses || minusWord.endsWith(".") || minusWord.endsWith("\n") ? 0 : 3)) > maxChars) {
		prevSpace = minusWord.lastIndexOf(" ")
		prevSpace = prevSpace > 0 ? prevSpace : minusWord.lastIndexOf("\n")
		if (prevSpace === -1) break
		minusWord = minusWord.slice(0, prevSpace).trimEnd()
	}
	const nextChar2 = untilMaxChars.charAt(prevSpace)

	return `${minusWord.trimEnd()}${(!ellipses || minusWord.endsWith(".") || nextChar2 === "\n" ? "" : "...")}`
}
