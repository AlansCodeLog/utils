import { expectType, inspectError, testName } from "@/testing"
import type { Mixin } from "@/types"
import { mixin } from "@/utils"
import { expect } from "@tests/chai"


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
		this._mixin({ mixin1: "", mixin2: 0 })
	}
	static speak() {
		return "Base Speak"
	}
	walk() {
		return "Base Walk"
	}
	baseOnly() {}
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
	static speak(str: string = "") {
		return `Mixin Speak${str}`
	}
	walk(str: string = ""): string {
		return `Mixin Walk${str}`
	}
	mixinOnly() {}
}
class Mixin2 {
	manuallyInitiated2!: number
	_constructor({ mixin2 }: { mixin2: number }) {
		this.manuallyInitiated2 = mixin2
	}
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Base extends Mixin<Mixin1 | Mixin2> { }

mixin(BaseIncorrect, [Mixin1, Mixin2])
mixin(Base, [Mixin1, Mixin2])

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
		expect(Base.speak()).to.equal("Base Speak")
	})
	it("does not work if mixins incorrectly initialized in base's constructor", () => {
		const mixed = new BaseIncorrect()
		expect(mixed.neverInitiated).to.equal(undefined)
		expect(mixed.manuallyInitiated).to.equal(undefined)
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
		expectType<(str: string) => string, "==>", typeof Base["speak"]>(false)
	})
	it("throws error if _mixin is defined on the base class", () => {
		expect(inspectError(() => {
			mixin(BaseError, [Mixin1, Mixin2])
		}))
	})
})
