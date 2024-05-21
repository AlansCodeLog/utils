/* eslint-disable @typescript-eslint/no-empty-function */

import type { IsAssignable, IsEqual } from "../types/index.js"
/**
 * Does not actually assert anything. Errors need to be caught by linting not testing, see more below.
 *
 * Supported operators:
 * `equal` or `===`
 * `assignableTo` or `==>`
 * ```ts
 * expectType<"a", "equal", "a">(true) // or:
 * expectType<"a", "===", "a">(true)
 *
 * expectType<"a", "equal", string>(false)
 *
 * expectType<"a", "assignableTo", string>(true) // or:
 * expectType<"a", "==>", string>(true)
 *
 * expectType<string, "assignableTo", "a">(false)
 * ```
 *
 * ## How to Test
 *
 * Some testing libraries might already report errors, but if they don't running these tests is like running tests without any assertions.
 *
 * The type assertions need to be "tested" by linting them with typescript (`npx tsc --noEmit --pretty` with the tsconfig including the tests directory).
 *
 * This does not mean this can't be used in other test files, it can, just note it's not asserting anything, only "linting" (or your editor) will reveal any errors.
 *
 * @testutil
 */
export function expectType<
	T,
	TOp extends OpAssignableTo | OpEqual,
	TOther,
>(
	_expected:
		TOp extends OpAssignableTo
		? IsAssignable<T, TOther>
		: TOp extends OpEqual
		? IsEqual<T, TOther>
		: never
): void { }

type OpAssignableTo = "assignableTo" | "==>"
type OpEqual = "equal" | "==="
