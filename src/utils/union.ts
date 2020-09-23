/** @packageDocumentation @module utils */

import { push_if_not_in } from "./push_if_not_in"

/**
 * Returns a unique union of all the arrays passed.
 *
 * Uses {@link push_if_not_in} internally.
 */
export function union<
	T extends
		any[] | readonly any[] =
		any[] | readonly any[]
>(...arrays: T[]): T {
	return push_if_not_in([] as any, ...arrays)
}
