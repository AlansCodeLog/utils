/* eslint-disable*/
// @ts-nocheck
import { isArray, pretty } from "@/utils"
import type chai from "@types/chai"

declare global {
	export namespace Chai {
		interface Assertion {
			partial: {
				deep:  & {
					eq: (value: any, message?: string, prettyLogObjects?: boolean) => Assertion
					equal: (value: any, message?:string, prettyLogObjects?: boolean) => Assertion
					equals: (value: any, message?: string, prettyLogObjects?: boolean) => Assertion
				}
			}
		}
	}
}

/**
 * A chai plugin that adds the ability to partially deep check for object equality. Note that it checks any **DEFINED** keys, if a key is undefined, it's assumed you want to check that the property should be undefined.
 *
 * Passes a modified expected object ("filling" its missing properties) to chai so only differences with the expected object are shown by chai.
 *
 * Takes a third parameter that will pretty log the passed objects (in the case of the expected object, as it was passed, not the filled version passed to chai).
 *
 * To use:
 * ```ts
 * import {partialDeepEqual} from "@alanscodelog/utils"
 * import chai from "chai"
 * chai.use(partialDeepEqual)
 *
 * //...
 * expect({a: "a", b:"b"}).to.partial.deep.equal({a: "a"}) //true
 * expect({a: "a", b:"b"}).to.partial.deep.equal({a: undefined}) //errors
 * expect({a: "a", b:"b"}).to.partial.deep.equal({}) //true
 * // custom message + pretty log
 * expect({a: "a", b:"b"}).to.partial.deep.equal({}, "Custom message:", true)
 * ```
 *
 * Note: If you have multiple test files, you will probably need to re-export chai with the plugin applied just once otherwise, adding it for each test file seems to cause problems.
 *
 * ```ts
 * // tests/chai.ts
 * import chai from "chai"
 *
 *
 * // importing should modify chai's types correctly (overriding deep.equal/equals/eq)
 * import { partialDeepEqual } from "./testing.js"
 * // ...other plugin imports
 *
 * chai.use(partialDeepEqual)
 * // chai.use(otherPlugins)
 *
 * export default chai
 * export const expect = chai.expect
 * // whatever other exports you need...
 * ```
 */
export function partialDeepEqual(_chai: typeof chai, utils: any): any {
	const Assertion = _chai.Assertion

	Assertion.addChainableMethod("partial",
		function () { },
		function () {
			_chai.util.flag(this, "partial", true)
		}
	)
	Assertion.overwriteMethod("equal", function(_super) {
		return function (other:any, message?:string, prettyLogObjects:boolean = false) {

			if (utils.flag(this, "partial")) {
				if (!utils.flag(this, "deep")) throw new Error("Can only do deep partial comparisons.")
				const obj = this._obj
				const merged = merge(obj, other)
				// todo test deep false
				const res = compare(obj, other, true)
				new Assertion(typeof obj).to.equal("object", "Value received needs to be an object.")
				new Assertion(typeof merged).to.equal("object", "Value to compare to / expect needs to be an object.")
				message = (message ?? "") + (message !== undefined ? ": " : "")
				this.assert(
					res,
					prettyLogObjects
						? `${message}Expected\n${pretty(obj)}\nto partially deep equal\n${pretty(other)}.`
						: `${message}Expected objects to be partially equal.`,
					prettyLogObjects
						? `${message}Expected\n${pretty(obj)}\nto NOT partially deep equal\n${pretty(other)}.`
						: `${message}Expected objects to NOT be partially equal.`,
					merged, // expected
					obj, // actual
				)
			} else {
				_super.apply(this, arguments)
			}
		}
	})
}

/* eslint-enable*/
// @ts-check
function compare(obj: any, required: any/* , deep: boolean */): boolean {
	if (obj === required) return
	const objKeys = Object.keys(obj)
	for (const key of Object.keys(required)) {
		if (!objKeys.includes(key)) return false
		const requiredVal = required[key]
		const val = obj[key]
		if (typeof val === "object" && typeof requiredVal === "object") {
			// if (deep) {
			const res = compare(val, requiredVal)
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
			if (res === false) return res
			// } else {
			// 	new Assertion(val).to.deep.equal(requiredVal)
			// }
		} else if (val !== requiredVal) return false
	}
	return true
}

/**
 * A special merge, that clones the required object and adds any missing properties to it but does not overwrite any existing properties, **not even if they're undefined**. This is so the diff will only show diffs of the properties we care about.
 */
function merge(obj: any, required: any/* , deep: boolean */): any {
	const clone = isArray(required) ? [...required] : { ...required }
	const requiredKeys = Object.keys(required)
	const keys = Object.keys(obj)


	for (const key of keys) {
		if (typeof obj[key] === "object" && typeof clone[key] === "object") {
			if (obj[key] !== clone[key]) {
				clone[key] = merge(obj[key], clone[key])
			}
		} else if (!requiredKeys.includes(key)) {
			clone[key] = obj[key]
		}
	}
	return clone
}

