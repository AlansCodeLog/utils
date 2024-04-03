import { describe, expect, it } from "vitest"

import { RingBuffer } from "../../src/utils/RingBuffer.js"


it("throws error for size less than or equal to 0", () => {
	expect(() => new RingBuffer(0)).to.throw()
	expect(() => new RingBuffer(-10)).to.throw()
})

it("pushes item and respects size limit", () => {
	const buffer = new RingBuffer<number>(1)
	buffer.push(1)
	buffer.push(2)
	expect(buffer.items).toEqual([2])
})

it("clear works", () => {
	const buffer = new RingBuffer<number>(1)
	buffer.push(1)
	buffer.clear()
	expect(buffer.items).toEqual([])
})

