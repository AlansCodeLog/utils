import { expectType, inspectError, testName } from "@/testing"
import type { Mixin } from "@/types"
import { mixin } from "@/utils"
import { expect } from "@tests/chai"


class BaseIncorrect {
	constructor() {
	}
}
interface BaseIncorrect extends Mixin<Mixin1 | Mixin2>, Mixin1, Mixin2 { _constructor: never }

class Base {
	type: string
	constructor() {
		this.type = "base"
		this._mixin({ mixin1: "", mixin2: 0 })
	}
	walk() {
		return "Base Walk"
	}
	baseOnly() { }
	canAccessSpeak() {
		// there should be no type error here
		return this.speak()
	}
}
class BaseError {
	_mixin() { }
}


class Mixin1 {
	neverInitiated: string = "nope"
	manuallyInitiated!: string
	_constructor({ mixin1 }: { mixin1: string }) {
		this.manuallyInitiated = mixin1
	}
	walk(str: string = ""): string {
		return `Mixin Walk${str}`
	}
	protected speak() {
		return "Mixin Protected Speak"
	}
	mixinOnly() { }
}

class Mixin2 {
	manuallyInitiated2!: number
	_constructor({ mixin2 }: { mixin2: number }) {
		this.manuallyInitiated2 = mixin2
	}
}

interface Base extends Mixin<Mixin1 | Mixin2>, Mixin1, Mixin2 { _constructor: never }

mixin(BaseIncorrect, [Mixin1, Mixin2])
mixin(Base, [Mixin1, Mixin2])

class Mixin3 extends Mixin1 {
}
class BaseIncorrect2 { }
interface BaseIncorrect2 extends Mixin<Mixin3>, Mixin3 { _constructor: never }
mixin(BaseIncorrect2, [Mixin3])
class Base2 { }
interface Base2 extends Mixin<Mixin3>, Mixin3 { _constructor: never }
mixin(Base2, [Mixin1, Mixin3])


describe(testName(), () => {
	it("correctly auto merges _constructor methods", () => {
		const mixed = new Base()
		expect(mixed.neverInitiated).to.equal(undefined)
		expect(mixed.manuallyInitiated).to.equal("")
		expect(mixed.manuallyInitiated2).to.equal(0)
	})
	it("correctly allows base to override Mixin methods", () => {
		const mixed = new Base()

		expect(mixed.walk()).to.equal("Base Walk")
	})
	it("does not work if mixins incorrectly initialized in base's constructor", () => {
		const mixed = new BaseIncorrect()
		expect(mixed.neverInitiated).to.equal(undefined)
		expect(mixed.manuallyInitiated).to.equal(undefined)
	})
	it("does not work if mixin extends other mixin and both not mixed", () => {
		const mixed = new BaseIncorrect2()
		const mixed2 = new Base2()
		expect(mixed.walk).to.equal(undefined)
		expect(mixed2.walk()).to.equal("Mixin Walk")
	})
	it("types work", () => {
		type MixinType = (opts: { mixin1: string } & { mixin2: number }) => void
		expectType<Base["_mixin"], "===", MixinType>(true)
		expectType<Base["manuallyInitiated"], "===", string>(true)
		expectType<Base["manuallyInitiated2"], "===", number>(true)
		// unfortunately this must be wrong
		expectType<Base["neverInitiated"], "===", string>(true)
		expectType<Base["type"], "===", string>(true)
		expectType<Base["mixinOnly"], "===", () => void>(true)
		expectType<Base["baseOnly"], "===", () => void>(true)
		expectType<(str: string) => string, "==>", Base["walk"]>(false)
	})
	it("throws error if _mixin is defined on the base class", () => {
		expect(inspectError(() => {
			mixin(BaseError, [Mixin1, Mixin2])
		}))
	})
})
