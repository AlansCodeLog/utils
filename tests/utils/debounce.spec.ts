/* eslint-disable @typescript-eslint/no-floating-promises */
import { testName } from "@/testing"
import { debounce, isDebouncedResult } from "@/utils"



jest.useFakeTimers()

describe(testName(), () => {
	it("debounces - trailing (default)", () => {
		let num = 0
		const func = jest.fn((amount: number = 1) => {
			num = amount
		})
		const debounced = debounce(func, 1000, { })
		debounced(1)
		debounced(2)
		debounced(3)
		expect(func.mock.calls.length).to.equal(0)
		expect(num).to.equal(0)

		jest.advanceTimersByTime(1001)
		expect(func.mock.calls.length).to.equal(1)
		expect(num).to.equal(3)
		debounced(4)
		jest.advanceTimersByTime(1001)
		expect(func.mock.calls.length).to.equal(2)
		expect(num).to.equal(4)
	})
	it("debounces - leading", () => {
		let num = 0
		const func = jest.fn((amount: number = 1) => {
			num = amount
		})
		const debounced = debounce(func, 1000, { leading: true, trailing: false })
		debounced(1)
		debounced(2)
		debounced(3)
		expect(func.mock.calls.length).to.equal(1)
		expect(num).to.equal(1)

		jest.advanceTimersByTime(1001)
		expect(func.mock.calls.length).to.equal(1)
		expect(num).to.equal(1)
		debounced(4)
		expect(func.mock.calls.length).to.equal(2)
		expect(num).to.equal(4)
	})
	it("debounces - trailing and leading", () => {
		let num = 0
		const func = jest.fn((amount: number = 1) => {
			num = amount
		})
		const debounced = debounce(func, 1000, { leading: true, trailing: true })
		debounced(1)
		debounced(2)
		debounced(3)
		expect(func.mock.calls.length).to.equal(1)
		expect(num).to.equal(1)

		jest.advanceTimersByTime(1001)
		expect(func.mock.calls.length).to.equal(2)
		expect(num).to.equal(3)
		jest.advanceTimersByTime(1001)
		debounced(4)
		jest.advanceTimersByTime(1001)
		expect(func.mock.calls.length).to.equal(3)
		expect(num).to.equal(4)
	})
	it("debounces - both false", () => {
		let num = 0
		const func = jest.fn((amount: number = 1) => {
			num = amount
		})
		const debounced = debounce(func, 1000, { leading: false, trailing: false })
		debounced(1)
		debounced(2)
		debounced(3)
		expect(func.mock.calls.length).to.equal(0)
		jest.advanceTimersByTime(1001)
		expect(func.mock.calls.length).to.equal(0)
	})
	it("debounces - queued", () => {
		const items = {
			1: 0,
			2: 0,
		}
		const func = (id: keyof typeof items, num: number = 1) => {
			items[id] = num
		}
		const debounced = debounce(func, 1000, { queue: true })
		debounced(1, 1)
		debounced(1, 2)
		debounced(2, 3)
		debounced(2, 4)
		debounced(2, 5)
		expect(items[1]).to.equal(0)
		expect(items[2]).to.equal(0)
		jest.advanceTimersByTime(1001)
		expect(items[1]).to.equal(2)
		expect(items[2]).to.equal(5)
	})
	it("debounces - queued - shared queues (last wins with trailing true, leading false)", () => {
		const res = {
			1: { num: 0, type: "" },
			2: { num: 0, type: "" },
		}
		const funcSave = (id: keyof typeof res, num: number = 1) => {
			res[id].num = num
			res[id].type = "save"
		}
		const funcRemove = (id: keyof typeof res, num: number = 1) => {
			res[id].num = num
			res[id].type = "remove"
		}

		const queue = {}
		const debouncedSave = debounce(funcSave, 1000, { queue })
		const debouncedRemove = debounce(funcRemove, 1000, { queue })

		debouncedSave(1, 1)
		debouncedRemove(1, 2)
		debouncedSave(1, 3)

		debouncedRemove(2, 4)
		debouncedSave(2, 5)
		debouncedRemove(2, 6)

		expect(res[1].num).to.equal(0)
		expect(res[2].num).to.equal(0)

		jest.advanceTimersByTime(1001)
		expect(res[1].num).to.equal(3)
		expect(res[2].num).to.equal(6)
		expect(res[1].type).to.equal("save")
		expect(res[2].type).to.equal("remove")
	})
	it("debounces - queued - custom index", () => {
		const items = {
			1: 0,
			2: 0,
		}
		const func = (_ignored: any, id: keyof typeof items, num: number) => {
			items[id] = num
		}
		const debounced = debounce(func, 1000, { queue: true, index: 1 })
		debounced("ignore", 1, 1)
		debounced("ignore", 2, 2)
		expect(items[1]).to.equal(0)
		expect(items[2]).to.equal(0)

		jest.advanceTimersByTime(1001)
		expect(items[1]).to.equal(1)
		expect(items[2]).to.equal(2)
	})
	it("debounces - queued - custom index function", () => {
		const items = {
			1: 0,
			2: 0,
		}
		const func = (_ignored: any, { id }: { id: keyof typeof items }, num: number) => {
			items[id] = num
		}
		const debounced = debounce(func, 1000, { queue: true, index: args => args[1].id })
		debounced("ignore", { id: 1 }, 1)
		debounced("ignore", { id: 2 }, 2)
		expect(items[1]).to.equal(0)
		expect(items[2]).to.equal(0)

		jest.advanceTimersByTime(1001)
		expect(items[1]).to.equal(1)
		expect(items[2]).to.equal(2)
	})
	it("promise", async () => {
		let count = 0
		const func = (num: number) => {
			count = num
			return count
		}

		const debounced = debounce(func, 1000, { promisify: true })

		const a1 = debounced(1)
		jest.advanceTimersByTime(1001)
		const res1 = await a1
		expect(res1).to.equal(1)
		const a2 = debounced(2)
		jest.advanceTimersByTime(1001)
		const res2 = await a2
		expect(res2).to.equal(2)

		const a3 = debounced(3)
		jest.advanceTimersByTime(1001)
		const res3 = await a3
		expect(res3).to.equal(3)
	})
	it("promise", async () => {
		let count = 0
		const func = (num: number) => {
			count = num
			return count
		}

		const debounced = debounce(func, 1000, { promisify: true })

		for (let i = 0; i < 10000; i++) {
			const a1 = debounced(i)
			jest.advanceTimersByTime(1001)
			// eslint-disable-next-line no-await-in-loop
			const res1 = await a1
			expect(res1).to.equal(i)
		}
		setTimeout(() => { }, 10000)
	})
	it("promise 2", async () => {
		let count = 0
		const func = (num: number) => {
			count = num
			return count
		}

		const debounced = debounce(func, 1000, { promisify: true })

		const a1 = debounced(1)
		const a2 = debounced(2)
		const a3 = debounced(3)
		jest.advanceTimersByTime(1001)
		const res3 = await a3
		// the following would have already been cancelled, we await just to extract the answer
		const res2 = await a2
		const res1 = await a1
		expect(isDebouncedResult(res1)).to.equal(true)
		expect(res2).to.be.instanceOf(Error)
		expect(res3).to.equal(3)
	})
	it("errors promise throws can be caught by debounced function", async () => {
		let count = 0
		const func = (num: number) => {
			count = num
			throw new Error(`${count}`)
		}

		const debounced = debounce(func, 1000, { promisify: true })

		const a1 = debounced(1).catch(err => {
			expect(isDebouncedResult(err)).to.equal(false)
			expect(err).to.be.instanceOf(Error)
			return true
		})
		jest.advanceTimersByTime(1001)
		const res3 = await a1
		expect(res3).to.equal(true)
	})
})
