import { findDuplicates, testName } from "../../src/index.js"
import { describe, expect, it } from "vitest"


class A {}
class B {}
class C {}
describe(testName(), () => {
	it("works", () => {
		expect(findDuplicates(["B", "A", "A", "B", "C", "A"])).to.deep.equal(["B", "A"])
	})
	it("works with custom `equals` function", () => {
		const firstA = new A()
		const firstB = new B()
		const repetitions = findDuplicates([firstB, firstA, new A(), new A(), new B(), new C(), new A()], {
			equals: (val, other) => val.constructor.name === other.constructor.name,
		})
		expect(repetitions).to.deep.equal([firstB, firstA])
	})
	it("works with undefined", () => {
		expect(findDuplicates([undefined, undefined, "A", "B", "A", "B"])).to.deep.equal([undefined, "A", "B"])
		expect(findDuplicates([undefined, undefined, "A", "B", "A", "B"], { equals: (val, other) => val === undefined && val === other })).to.deep.equal([undefined])
	})
})
