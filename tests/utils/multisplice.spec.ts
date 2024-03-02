import { describe, expect, it } from "vitest"

import { inspectError, multisplice } from "../../src/index.js"
import { testName } from "../../src/testing/index.js"
import { MULTISPLICE_ITEM } from "../../src/utils/multisplice.js"


describe(testName(), () => {
	describe("deletes", () => {
		it("deletes single index location", () => {
			const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			// splice out the even numbers
			const arr = multisplice(array, 0)
			expect(arr.array).to.equal(array)
			expect(arr.array).to.deep.equal([2, 3, 4, 5, 6, 7, 8, 9, 10])
			expect(arr.removed).to.deep.equal([1])
		})
		it("deletes multiple index locations", () => {
			const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			// splice out the even numbers
			const arr = multisplice(array, [1, 3, 5, 7, 9], 1)
			expect(arr.array).to.equal(array)
			expect(arr.array).to.deep.equal([1, 3, 5, 7, 9])
			expect(arr.removed).to.deep.equal([2, 4, 6, 8, 10])
		})
		it("deletes more than one element at a time", () => {
			const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			const arr = multisplice(array, [0, 4], 2)
			expect(arr.array).to.equal(array)
			expect(arr.array).to.deep.equal([3, 4, 7, 8, 9, 10])
			expect(arr.removed).to.deep.equal([1, 2, 5, 6])
		})
	})

	describe("inserts", () => {
		it("non-array item at single position - SINGLE", () => {
			const item = 0
			const array = [1, 2, 3]
			const arr = multisplice(array, 0, 0, item)
			expect(arr.array).to.equal(array)
			expect(arr.array).to.deep.equal([0, 1, 2, 3])
			expect(arr.removed).to.deep.equal([])
		})
		it("array items at single position - SINGLE", () => { // is interpreted the same as above
			const item = 0
			const array = [1, 2, 3]
			const arr = multisplice(array, 0, 0, [item])
			expect(arr.array).to.equal(array)
			expect(arr.array).to.deep.equal([[0], 1, 2, 3])
			expect(arr.removed).to.deep.equal([])
		})
		it("non-array item at multiple positions - SINGLE", () => {
			const item = 0
			const array = [1, 2, 3]
			const arr = multisplice(array, [0, 1], 0, item)
			expect(arr.array).to.equal(array)
			expect(arr.array).to.deep.equal([0, 1, 0, 2, 3])
			expect(arr.removed).to.deep.equal([])
		})
		it("array items at multiple positions - SINGLE", () => { // is interpreted the same as above
			const item = 0
			const array = [1, 2, 3]
			const arr = multisplice(array, [0, 1], 0, [item])
			expect(arr.array).to.equal(array)
			expect(arr.array).to.deep.equal([[0], 1, [0], 2, 3])
			expect(arr.removed).to.deep.equal([])
		})
		it("array item at multiple positions - MATCHED_INDEX", () => {
			const items = [1, 2, 3]
			const array = [1, 2, 3]
			const arr = multisplice(array, [0, 1, 2], 0, items, { insert: MULTISPLICE_ITEM.MATCH_INDEX })
			expect(arr.array).to.equal(array)
			expect(arr.array).to.deep.equal(items.concat(items).sort())
			expect(arr.removed).to.deep.equal([])
		})
		it("array item at multiple positions - MATCHED_INDEX_LOOSE", () => {
			const items = [1, 2]
			const array = [1, 2, 3]
			const arr = multisplice(array, [0, 1, 2], 0, items, { insert: MULTISPLICE_ITEM.MATCH_INDEX_LOOSE })
			expect(arr.array).to.equal(array)
			expect(arr.array).to.deep.equal(items.concat([1, 2, 3]).sort())
			expect(arr.removed).to.deep.equal([])
		})
		it("and deletes multiple at multiple positions - MATCHED_INDEX_LOOSE", () => {
			const items = [[2, 3], [5, 6]]
			const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
			const arr = multisplice(array, [1, 4, 7], 2, items as any, { insert: MULTISPLICE_ITEM.MATCH_INDEX_LOOSE })
			expect(arr.array).to.equal(array)
			expect(arr.array).to.deep.equal([1, [2, 3], 4, [5, 6], 7])
			expect(arr.removed).to.deep.equal([2, 3, 5, 6, 8, 9])
		})
	})
	describe("throws if", () => {
		it("ranges to delete interfere with each other", () => {
			const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			expect(inspectError(() => {
				const arr = multisplice(array, [0, 1], 2)
			})).to.throw()
		})
		it("ranges to insert/delete interfere with each other", () => {
			const items = [5, 6]

			const array = [1, 2, 3, 4]
			expect(inspectError(() => {
				multisplice(array, [0, 2], 3, items as any, { insert: MULTISPLICE_ITEM.MATCH_INDEX_LOOSE })
			}, false)).to.throw()
		})
		it("items length !== indexes.length when using MATCHED_INDEX", () => {
			expect(inspectError(() => {
				const items = [1, 2] // remove 10 so we don't have to deal with sort
				const array = [1, 2, 3]
				multisplice(array, [0, 1, 2], 0, items, { insert: MULTISPLICE_ITEM.MATCH_INDEX })
			}, false)).to.throw()
		})
	})
	describe("does not throw if", () => {
		it("ranges only touch", () => {
			const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			expect(inspectError(() => {
				const arr = multisplice(array, [0, 1], 1)
				expect(arr.array).to.deep.equal([3, 4, 5, 6, 7, 8, 9, 10])
			}, false)).to.not.throw()
		})

		it("ranges to insert/delete interfere only touch", () => {
			const items = [5, 6]
			const array = [1, 2, 3, 4]
			const arr = multisplice(array, [0, 2], 2, items as any, { insert: MULTISPLICE_ITEM.MATCH_INDEX_LOOSE })
			expect(arr.array).to.equal(array)
			expect(arr.array).to.deep.equal([5, 6])
			expect(arr.removed).to.deep.equal([1, 2, 3, 4])
		})
		it("we delete past the end of the array", () => {
			const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			expect(inspectError(() => {
				multisplice(array, [1, 9], 4)
			}, false)).to.not.throw()
		})
	})
})
