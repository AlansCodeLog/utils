import { expect } from "@tests/chai"

import { test_name } from "@/testing"
import { find_duplicates } from "@/utils"


class A {}
class B {}
class C {}
describe(test_name(), () => {
	it("works", () => {
		expect(find_duplicates(["B", "A", "A", "B", "C", "A"])).to.deep.equal(["B", "A"])
	})
	it("works with custom `equals` function", () => {
		let first_a = new A()
		let first_b = new B()
		let repetitions = find_duplicates([first_b, first_a, new A(), new A(), new B(), new C(), new A()], {
			equals: (val, other) => val.constructor.name === other.constructor.name,
		})
		expect(repetitions).to.deep.equal([first_b, first_a])
	})
	it("works with undefined", () => {
		expect(find_duplicates([undefined, undefined, "A", "B", "A", "B"])).to.deep.equal([undefined, "A", "B"])
		expect(find_duplicates([undefined, undefined, "A", "B", "A", "B"], { equals: (val, other) => val === undefined && val === other })).to.deep.equal([undefined])
	})
})
