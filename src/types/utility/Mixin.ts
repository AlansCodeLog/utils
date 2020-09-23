/** @packageDocumentation @module types */

import type { AnyFunction } from "./AnyFunction"
import type { OrToAnd } from "./OrToAnd"

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
	TClass extends { __constructor: AnyFunction } | any,
	TParams extends
		TClass extends { __constructor: AnyFunction } ? Parameters<TClass["__constructor"]> : [{}] =
		TClass extends { __constructor: AnyFunction } ? Parameters<TClass["__constructor"]> : [{}],
	TFirst extends TParams[0] = TParams[0]
> =
	& Omit<OrToAnd<TClass>, "__constructor">
	& {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		__mixin(opts: OrToAnd<TFirst>): void
	}
