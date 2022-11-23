import type { AnyFunction } from "./AnyFunction.js"
import type { OrToAnd } from "./OrToAnd.js"


type AnyClassForMixin = {
	_constructor: AnyFunction
}

/**
 * See {@link mixin `mixin`}.
 *
 * Creates the type of an object with a `_mixin` method whose first parameter is a combination of the types of the first parameter of the `_constructor`'s of the different mixins.
 *
 * Note:
 * - You must still extend from the mixins. See why below.
 * - The classes should be passed as a union like `Mixins<Mixin1 | Mixin2>`, otherwise they won't work.
 *
 * ```ts
 * interface Mixed extends Mixins<Mixin1 | Mixin2>, Mixin1, Mixin2 {
 * 	_constructor: never
 * }
 * ```
 *
 * Why do we still have to extend from the mixins? If we don't, protected methods are lost and also there might be odd errors when extending from the Mixed class itself.
 */
export type Mixin<
	TClass extends AnyClassForMixin | any,
	TParams extends
	TClass extends AnyClassForMixin ? Parameters<TClass["_constructor"]> : [{}] =
	TClass extends AnyClassForMixin ? Parameters<TClass["_constructor"]> : [{}],
	TFirst extends TParams[0] = TParams[0],
> =
	& {
		_mixin(opts: OrToAnd<TFirst>): void
	}
