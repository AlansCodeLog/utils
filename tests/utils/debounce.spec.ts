import { expect } from "chai"
import { performance } from "perf_hooks"

import { test_name } from "@/testing"
import { debounce } from "@/utils/debounce"


describe(test_name(), () => {
	it("debounces", () => {
		let count = 0
		let func = () => {
			count++
		}
		let debounced = debounce(func, 1000)
		debounced()
		expect(count).to.equal(0)
		setTimeout(() => {
			expect(count).to.equal(1)
		}, 1001)
	})
	it("debounces - leading - called multiple times", finished => {
		let count = 0
		let func = () => {
			count++
		}
		let debounced = debounce(func, 1000, { leading: true, trailing: false })
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
		let func = () => {
			count++
		}
		let debounced = debounce(func, 1000, { leading: true, trailing: false })
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
		let func = () => {
			count++
		}
		let debounced = debounce(func, 1000, { leading: true })
		debounced()
		expect(count).to.equal(1)
		setTimeout(() => {
			expect(count).to.equal(1)
			finished()
		}, 1001)
	})
	it("debounces - trailing and leading - called multiple times", finished => {
		let count = 0
		let func = () => {
			count++
		}
		let debounced = debounce(func, 1000, { leading: true })
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
		let count = {
			1: 0,
			2: 0,
		}
		let func = (id: keyof typeof count) => {
			count[id]++
		}
		let debounced = debounce(func, 1000, { queue: true })
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
		let count = {
			1: 0,
			2: 0,
		}
		let func = (id: keyof typeof count) => {
			count[id]++
		}
		let debounced = debounce(func, 1000, { queue: true })
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
		let res = {
			1: 0,
			2: 0,
		}
		let func = (id: keyof typeof res) => {
			res[id]++
		}
		let debounced = debounce(func, 1000, { queue: true })
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
		let res = {
			1: { count: 0, type: "" },
			2: { count: 0, type: "" },
		}
		let func_save = (id: keyof typeof res) => {
			res[id].count++
			res[id].type = "save"
		}
		let func_remove = (id: keyof typeof res) => {
			res[id].count++
			res[id].type = "remove"
		}

		let queue = {}
		let debounced_save = debounce(func_save, 1000, { queue })
		let debounced_remove = debounce(func_remove, 1000, { queue })

		debounced_save(1)
		debounced_remove(1)
		debounced_save(1)

		debounced_remove(2)
		debounced_save(2)
		debounced_remove(2)

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
		let count = {
			1: 0,
			2: 0,
		}
		let func = (_ignored: any, id: keyof typeof count) => {
			count[id]++
		}
		let debounced = debounce(func, 1000, { queue: true, index: 1 })
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
		let count = {
			1: 0,
			2: 0,
		}
		let func = (_ignored: any, { id }: {id: keyof typeof count}) => {
			count[id]++
		}
		let debounced = debounce(func, 1000, { queue: true, index: args => args[1].id })
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
