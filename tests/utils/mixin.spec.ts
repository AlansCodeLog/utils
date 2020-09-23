/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/unbound-method */
import { expect } from "chai"
import { expectType, TypeEqual } from "ts-expect"

import { inspect_error, test_name } from "@/testing"
import type { Mixin } from "@/types"
import { mixin } from "@/utils"


class BaseIncorrect {
	constructor() {
	}
}
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface BaseIncorrect extends Mixin<Mixin1 | Mixin2> { }

class Base {
	type: string
	constructor() {
		this.type = "base"
		this.__mixin({ mixin1: "", mixin2: 0 })
	}
	static speak() {
		return "Base Speak"
	}
	walk() {
		return "Base Walk"
	}
	base_only() {}
}
class BaseError {
	__mixin() { }
}


class Mixin1 {
	never_initiated: string = "nope"
	manually_initiated!: string
	__constructor({ mixin1 }: { mixin1: string }) {
		this.manually_initiated = mixin1
	}
	static speak(str: string = "") {
		return `Mixin Speak${str}`
	}
	walk(str: string = "") {
		return `Mixin Walk${str}`
	}
	mixin_only() {}
}
class Mixin2 {
	manually_initiated2!: number
	__constructor({ mixin2 }: {mixin2: number}) {
		this.manually_initiated2 = mixin2
	}
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Base extends Mixin<Mixin1 | Mixin2> { }

mixin(BaseIncorrect, [Mixin1, Mixin2])
mixin(Base, [Mixin1, Mixin2])

describe(test_name(), () => {
	it("correctly auto merges __constructor methods", () => {
		let mixed = new Base()
		expect(mixed.never_initiated).to.equal(undefined)
		expect(mixed.manually_initiated).to.equal("")
		expect(mixed.manually_initiated2).to.equal(0)
	})
	it("correctly allows base to override Mixin methods", () => {
		let mixed = new Base()

		expect(mixed.walk()).to.equal("Base Walk")
		expect(Base.speak()).to.equal("Base Speak")
	})
	it("does not work if mixins incorrectly initialized in base's constructor", () => {
		let mixed = new BaseIncorrect()
		expect(mixed.never_initiated).to.equal(undefined)
		expect(mixed.manually_initiated).to.equal(undefined)
	})
	it("types work", () => {
		type mixin_type = (opts: { mixin1: string } & { mixin2: number }) => void
		expectType<TypeEqual<Base["__mixin"], mixin_type>>(true)
		expectType<TypeEqual<Base["manually_initiated"], string>>(true)
		expectType<TypeEqual<Base["manually_initiated2"], number>>(true)
		// unfortunately this must be wrong
		expectType<TypeEqual<Base["never_initiated"], string>>(true)
		expectType<TypeEqual<Base["type"], string>>(true)
		expectType<TypeEqual<Base["mixin_only"], () => void>>(true)
		expectType<TypeEqual<Base["base_only"], () => void>>(true)
		expectType<TypeEqual<Base["walk"], (str: string) => string>>(false)
		expectType<TypeEqual<typeof Base["speak"], (str: string) => string>>(false)
	})
	it("throws error if __mixin is defined on the base class", () => {
		expect(inspect_error(() => {
			mixin(BaseError, [Mixin1, Mixin2])
		}))
	})
})
