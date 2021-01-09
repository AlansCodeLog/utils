import type { AnyFunction } from "./AnyFunction"
import type { OrToAnd } from "./OrToAnd"


type AnyClassForMixin = { _constructor: AnyFunction }
/**
 * See {@link mixin `mixin`}
 *
 * Note the classes should be passed as a union, otherwise they won't work. e.g:
 * ```ts
 * interface Base extends Mixins<Mixin1 | Mixin2> {}
 * // NOT
 * interface Base extends Mixins<Mixin1 & Mixin2> {}
 * ```
 */
export type Mixin<
	TClass extends AnyClassForMixin | any,
	TParams extends
	TClass extends AnyClassForMixin ? Parameters<TClass["_constructor"]> : [{}] =
	TClass extends AnyClassForMixin ? Parameters<TClass["_constructor"]> : [{}],
	TFirst extends TParams[0] = TParams[0],
> =
	& Omit<OrToAnd<TClass>, "_constructor">
	& {
		_mixin(opts: OrToAnd<TFirst>): void
	}
