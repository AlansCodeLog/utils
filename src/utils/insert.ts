import type { ErrorW } from "@/types"

/**
 * Inserts a string into another at the given range or position.
 *
 * It will throw an `ErrorW<{range: [number, number]}>` if the (normalized*) range's start comes after the end.
 *
 * \* Negative ranges are normalized to positive positions. If the range is still negative after the normalization this means it was out of bounds (e.g. before the string's start) and it's set to zero. So passing a range like `[-20, -10]` with a string of length 1, would *not* error, since it's just interpreted as `[0, 0]` (which is how slice already works).
 */
export function insert(str: string, intoStr: string, range: number | [number, number]): string {
	range = typeof range === "number" ? [range, range] : range
	const origRange: [number, number] = [...range]

	// normalizes the negative ranges or sets them to 0 if they're still negative after the normalization
	if (range[0] < 0) {
		let newStart = intoStr.length + range[0]
		if (newStart < 0) newStart = 0
		range[0] = newStart
	}
	if (range[1] < 0) {
		let newEnd = intoStr.length + range[1]
		if (newEnd < 0) newEnd = 0
		range[1] = newEnd
	}

	if (range[0] > range[1]) {
		const start = `${origRange[0]}${origRange[0] < 0 ? ` (normalized to ${range[0]})` : ""}`
		const end = `${origRange[1]}${origRange[1] < 0 ? ` (normalized to ${range[1]})` : ""}`

		const error = new Error(`Range start ${start} cannot come after range end ${end}`) as ErrorW<{range: [number, number]}>
		error.range = origRange
		throw error
	}
	return intoStr.slice(0, range[0]) + str + intoStr.slice(range[1], intoStr.length)
}

