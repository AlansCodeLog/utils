/** @packageDocumentation @module utils */

import type { ErrorW } from "@/types"

/**
 * Inserts a string into another at the given range or position.
 *
 * It will throw an `ErrorW<{range: [number, number]}>` if the (normalized*) range's start comes after the end.
 *
 * \* Negative ranges are normalized to positive positions. If the range is still negative after the normalization this means it was out of bounds (e.g. before the string's start) and it's set to zero. So passing a range like `[-20, -10]` with a string of length 1, would *not* error, since it's just interpreted as `[0, 0]` (which is how slice already works).
 */
export function insert(str: string, into_str: string, range: number | [number, number]): string {
	range = typeof range === "number" ? [range, range] : range
	let orig_range: [number, number] = [...range]

	// normalizes the negative ranges or sets them to 0 if they're still negative after the normalization
	if (range[0] < 0) {
		let new_start = into_str.length + range[0]
		if (new_start < 0) new_start = 0
		range[0] = new_start
	}
	if (range[1] < 0) {
		let new_end = into_str.length + range[1]
		if (new_end < 0) new_end = 0
		range[1] = new_end
	}

	if (range[0] > range[1]) {
		let start = `${orig_range[0]}${orig_range[0] < 0 ? ` (normalized to ${range[0]})` : ""}`
		let end = `${orig_range[1]}${orig_range[1] < 0 ? ` (normalized to ${range[1]})` : ""}`

		let error = new Error(`Range start ${start} cannot come after range end ${end}`) as ErrorW<{range: [number, number]}>
		error.range = orig_range
		throw error
	}
	return into_str.slice(0, range[0]) + str + into_str.slice(range[1], into_str.length)
}

