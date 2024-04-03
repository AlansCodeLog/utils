/**
 * Sets an objects key by keypath array then returns the object.
 *
 * If keypath does not have any keys, the object will *not* be mutated, and the value to assign will just be returned.
 *
 * ```ts
 * const obj = { a: { b: ["c"]} }
 * // mutates and returns the mutated obj
 * set(obj, ["a", "b", 0], "d")
 * // obj.a.b[0] is now "d"
 *
 * obj2 = set(obj, [], {}, {noError:true})
 * // obj is still the above, obj2 is {}
 * ```
 */
export function set(
	mutated: any,
	keypath: (string | number)[],
	val: any,
): any {
	if (keypath.length === 0) {
		return val
	}
	let lastObj = mutated
	for (let i = 0; i < keypath.length - 1; i++) {
		lastObj = lastObj[keypath[i]]
	}
	lastObj[keypath[keypath.length - 1]] = val
	return mutated
}
