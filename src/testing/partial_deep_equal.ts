/** @packageDocumentation @module testing */
/* eslint-disable*/
// @ts-nocheck
import { is_array, pretty } from "@/utils"
import type chai from "chai"

declare global {
	export namespace Chai {
		interface Assertion {
			partial: {
				deep: Deep & {
					eq: (value: any, message?: string, pretty_log_objects?: boolean) => Assertion
					equal: (value: any, message?:string, pretty_log_objects?: boolean) => Assertion
					equals: (value: any, message?: string, pretty_log_objects?: boolean) => Assertion
				}
			}
		}
	}
}

/**
 * A chai plugin that adds the ability to partially deep check for object equality. Note that it checks any **DEFINED** keys, if a key is undefined, it's assumed you want to check that that property should be undefined.
 *
 * Passes a modified expected object ("filling" its missing properties) to chai so only differences with the expected object are shown by chai.
 *
 * Takes a third parameter that will pretty log the passed objects (in the case of the expected object, as it was passed, not the filled version passed to chai).
 *
 * To use:
 * ```ts
 * import {partial_deep_equal} from "@alanscodelog/utils"
 * import chai from "chai"
 * chai.use(partial_deep_equal)
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
 * import { partial_deep_equal } from "@/testing"
 * // ...other plugin imports
 *
 * chai.use(partial_deep_equal)
 * // chai.use(other_plugins)
 *
 * export default chai
 * export const expect = chai.expect
 * // whatever other exports you need...
 * ```
 */
export function partial_deep_equal(_chai: typeof chai, utils: any): any {
	let Assertion = _chai.Assertion

	Assertion.addChainableMethod("partial",
		function () { },
		function () {
			_chai.util.flag(this, "partial", true)
		}
	)
	Assertion.overwriteMethod("equal", function(_super) {
		return function (other:any, message?:string, pretty_log_objects:boolean = false) {

			if (utils.flag(this, "partial")) {
				if (!utils.flag(this, "deep")) throw new Error("Can only do deep partial comparisons.")
				let obj = this._obj
				let merged = merge(obj, other)
				// todo test deep false
				let res = compare(obj, other, true)
				new Assertion(typeof obj).to.equal("object", "Value received needs to be an object.")
				new Assertion(typeof merged).to.equal("object", "Value to compare to / expect needs to be an object.")
				message = (message ?? "") + (message !== undefined ? ": " : "")
				this.assert(
					res,
					pretty_log_objects
						? `${message}Expected\n${pretty(obj)}\nto partially deep equal\n${pretty(other)}.`
						: `${message}Expected objects to be partially equal.`,
					pretty_log_objects
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
	let obj_keys = Object.keys(obj)
	for (let key of Object.keys(required)) {
		if (!obj_keys.includes(key)) return false
		let required_val = required[key]
		let val = obj[key]
		if (typeof val === "object" && typeof required_val === "object") {
			// if (deep) {
			let res = compare(val, required_val)
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
			if (res === false) return res
			// } else {
			// 	new Assertion(val).to.deep.equal(required_val)
			// }
		} else if (val !== required_val) return false
	}
	return true
}

/** A special merge, that clones the required object and adds any missing properties to it but does not overwrite any existing properties, **not even if they're undefined**. This is so the diff will only show diffs of the properties we care about. */
function merge(obj: any, required: any/* , deep: boolean */): any {
	let clone = is_array(required) ? [...required] : { ...required }

	let required_keys = Object.keys(required)

	for (let key of Object.keys(obj)) {
		if (typeof obj[key] === "object" && typeof clone[key] === "object") {
			// if (deep) {
			clone[key] = merge(obj[key], clone[key])
			// } else {
			// 	clone[key] = obj[key]
			// }
		} else if (!required_keys.includes(key)) {
			clone[key] = obj[key]
		}
	}
	return clone
}

