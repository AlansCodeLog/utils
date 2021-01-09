import { testName } from "@/testing"
import { debounce } from "@/utils/debounce"
import { expect } from "@tests/chai"


describe(testName(), () => {
	it("debounces", () => {
		let count = 0
		const func = () => {
			count++
		}
		const debounced = debounce(func, 1000)
		debounced()
		expect(count).to.equal(0)
		setTimeout(() => {
			expect(count).to.equal(1)
		}, 1001)
	})
	it("debounces - leading - called multiple times", finished => {
		let count = 0
		const func = () => {
			count++
		}
		const debounced = debounce(func, 1000, { leading: true, trailing: false })
		debounced()
		expect(count).to.equal(1)
		debounced()
		debounced()
		expect(count).to.equal(1)
		setTimeout(() => {
			expect(count).to.equal(1)
			finished()
		}, 1001)
	})
	it("debounces - leading - called once", finished => {
		let count = 0
		const func = () => {
			count++
		}
		const debounced = debounce(func, 1000, { leading: true, trailing: false })
		debounced()
		expect(count).to.equal(1)
		setTimeout(() => {
			expect(count).to.equal(1)
			debounced()
			expect(count).to.equal(2)
			finished()
		}, 1001)
	})
	it("debounces - trailing and leading - called once", finished => {
		let count = 0
		const func = () => {
			count++
		}
		const debounced = debounce(func, 1000, { leading: true })
		debounced()
		expect(count).to.equal(1)
		setTimeout(() => {
			expect(count).to.equal(1)
			finished()
		}, 1001)
	})
	it("debounces - trailing and leading - called multiple times", finished => {
		let count = 0
		const func = () => {
			count++
		}
		const debounced = debounce(func, 1000, { leading: true })
		debounced()
		expect(count).to.equal(1)
		debounced()
		debounced()
		expect(count).to.equal(1)
		setTimeout(() => {
			expect(count).to.equal(2)
			finished()
		}, 1001)
	})
	it("debounces - queued - both called", finished => {
		const count = {
			1: 0,
			2: 0,
		}
		const func = (id: keyof typeof count) => {
			count[id]++
		}
		const debounced = debounce(func, 1000, { queue: true })
		debounced(1)
		debounced(2)
		expect(count[1]).to.equal(0)
		expect(count[2]).to.equal(0)
		setTimeout(() => {
			expect(count[1]).to.equal(1)
			expect(count[2]).to.equal(1)
			finished()
		}, 1001)
	})
	it("debounces - queued - both called multiple times", finished => {
		const count = {
			1: 0,
			2: 0,
		}
		const func = (id: keyof typeof count) => {
			count[id]++
		}
		const debounced = debounce(func, 1000, { queue: true })
		debounced(1)
		debounced(1)
		debounced(2)
		debounced(2)
		debounced(2)
		expect(count[1]).to.equal(0)
		expect(count[2]).to.equal(0)
		setTimeout(() => {
			expect(count[1]).to.equal(1)
			expect(count[2]).to.equal(1)
			finished()
		}, 1001)
	})
	it("debounces - queued - only one called", finished => {
		const res = {
			1: 0,
			2: 0,
		}
		const func = (id: keyof typeof res) => {
			res[id]++
		}
		const debounced = debounce(func, 1000, { queue: true })
		debounced(1)
		expect(res[1]).to.equal(0)
		expect(res[2]).to.equal(0)
		setTimeout(() => {
			expect(res[1]).to.equal(1)
			expect(res[2]).to.equal(0)
			finished()
		}, 1001)
	})
	it("debounces - queued - shared queues (last wins with trailing true, leading false)", finished => {
		const res = {
			1: { count: 0, type: "" },
			2: { count: 0, type: "" },
		}
		const funcSave = (id: keyof typeof res) => {
			res[id].count++
			res[id].type = "save"
		}
		const funcRemove = (id: keyof typeof res) => {
			res[id].count++
			res[id].type = "remove"
		}

		const queue = {}
		const debouncedSave = debounce(funcSave, 1000, { queue })
		const debouncedRemove = debounce(funcRemove, 1000, { queue })

		debouncedSave(1)
		debouncedRemove(1)
		debouncedSave(1)

		debouncedRemove(2)
		debouncedSave(2)
		debouncedRemove(2)

		expect(res[1].count).to.equal(0)
		expect(res[2].count).to.equal(0)
		setTimeout(() => {
			expect(res[1].count).to.equal(1)
			expect(res[2].count).to.equal(1)
			expect(res[1].type).to.equal("save")
			expect(res[2].type).to.equal("remove")
			finished()
		}, 1001)
	})
	it("debounces - queued - custom index", finished => {
		const count = {
			1: 0,
			2: 0,
		}
		const func = (_ignored: any, id: keyof typeof count) => {
			count[id]++
		}
		const debounced = debounce(func, 1000, { queue: true, index: 1 })
		debounced("ignore", 1)
		debounced("ignore", 2)
		expect(count[1]).to.equal(0)
		expect(count[2]).to.equal(0)
		setTimeout(() => {
			expect(count[1]).to.equal(1)
			expect(count[2]).to.equal(1)
			finished()
		}, 1001)
	})
	it("debounces - queued - custom index function", finished => {
		const count = {
			1: 0,
			2: 0,
		}
		const func = (_ignored: any, { id }: {id: keyof typeof count}) => {
			count[id]++
		}
		const debounced = debounce(func, 1000, { queue: true, index: args => args[1].id })
		debounced("ignore", { id: 1 })
		debounced("ignore", { id: 2 })
		expect(count[1]).to.equal(0)
		expect(count[2]).to.equal(0)
		setTimeout(() => {
			expect(count[1]).to.equal(1)
			expect(count[2]).to.equal(1)
			finished()
		}, 1001)
	})
})
