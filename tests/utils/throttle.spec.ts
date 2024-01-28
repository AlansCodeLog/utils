import { describe, expect, it, vi } from "vitest"

import { testName, throttle } from "../../src/index.js"


vi.useFakeTimers()

describe(testName(), () => {
	it("throttles - trailing", () => {
		let res = 0
		const func = vi.fn((num: number = 1) => {
			res = num
		})
		const throttled = throttle(func, 1000, { leading: false, trailing: true })
		throttled(1)
		vi.advanceTimersByTime(500)
		throttled(2)
		throttled(3)
		expect(func.mock.calls.length).to.equal(0)
		expect(res).to.equal(0)

		vi.advanceTimersByTime(501)

		expect(func.mock.calls.length).to.equal(1)
		expect(res).to.equal(3)
		throttled(4)
		vi.advanceTimersByTime(1001)
		expect(func.mock.calls.length).to.equal(2)
		expect(res).to.equal(4)
	})
	it("throttles - leading", () => {
		let res = 0
		const func = vi.fn((num: number = 1) => {
			res = num
		})
		const throttled = throttle(func, 1000, { leading: true, trailing: false })
		throttled(1)
		expect(func.mock.calls.length).to.equal(1)
		expect(res).to.equal(1)
		vi.advanceTimersByTime(500)
		throttled(2)
		throttled(3)

		vi.advanceTimersByTime(501)
		expect(func.mock.calls.length).to.equal(1)
		expect(res).to.equal(1)
		throttled(4)
		throttled(5)
		expect(func.mock.calls.length).to.equal(2)
		expect(res).to.equal(4)
		vi.advanceTimersByTime(1001)
		expect(func.mock.calls.length).to.equal(2)
	})
	it("throttles - trailing and leading (default)", () => {
		let res = 0
		const func = vi.fn((num: number = 1) => {
			res = num
		})
		const throttled = throttle(func, 1000, { })
		throttled(1)
		expect(func.mock.calls.length).to.equal(1)
		expect(res).to.equal(1)
		vi.advanceTimersByTime(500)
		throttled(2)
		throttled(3)

		vi.advanceTimersByTime(501)
		expect(func.mock.calls.length).to.equal(2)
		expect(res).to.equal(3)
		throttled(4)
		expect(func.mock.calls.length).to.equal(3)
		expect(res).to.equal(4)
		throttled(5)
		vi.advanceTimersByTime(1001)
		expect(func.mock.calls.length).to.equal(4)
		expect(res).to.equal(5)
	})
	it("throttles - both false", () => {
		let num = 0
		const func = vi.fn((amount: number = 1) => {
			num = amount
		})
		const throttled = throttle(func, 1000, { leading: false, trailing: false })
		throttled(1)
		throttled(2)
		throttled(3)
		expect(func.mock.calls.length).to.equal(0)
		vi.advanceTimersByTime(1001)
		expect(func.mock.calls.length).to.equal(0)
	})
	it("throttles - queued", () => {
		const items = {
			1: 0,
			2: 0,
		}
		const func = (id: keyof typeof items, num: number = 1) => {
			items[id] = num
		}
		const throttled = throttle(func, 1000, { queue: true })
		throttled(1, 1)
		throttled(2, 3)
		vi.advanceTimersByTime(500)
		throttled(1, 2)
		throttled(2, 4)
		throttled(2, 5)
		expect(items[1]).to.equal(1)
		expect(items[2]).to.equal(3)
		vi.advanceTimersByTime(501)
		expect(items[1]).to.equal(2)
		expect(items[2]).to.equal(5)
	})
	it("throttles - queued - custom index", () => {
		const items = {
			1: 0,
			2: 0,
		}
		const func = (_ignored: any, id: keyof typeof items, num: number) => {
			items[id] = num
		}
		const throttled = throttle(func, 1000, { queue: true, index: 1 })
		throttled("ignore", 1, 1)
		throttled("ignore", 2, 2)
		expect(items[1]).to.equal(1)
		expect(items[2]).to.equal(2)
	})
	it("throttles - queued - custom index function", () => {
		const items = {
			1: 0,
			2: 0,
		}
		const func = (_ignored: any, { id }: { id: keyof typeof items }, num: number) => {
			items[id] = num
		}
		const throttled = throttle(func, 1000, { queue: true, index: args => args[1].id })
		throttled("ignore", { id: 1 }, 1)
		throttled("ignore", { id: 2 }, 2)
		expect(items[1]).to.equal(1)
		expect(items[2]).to.equal(2)
	})
})
