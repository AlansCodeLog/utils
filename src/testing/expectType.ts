/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IsAssignable, IsEqual } from "@/types"
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
 * If using `ts-jest`\* it will already report type errors (if `diagnostics` is true which it is by default), but if using `babel-jest`:
 *
 * Letting jest test any tests that only use this function (like all the ones in the `types` folder) is like running tests that have no assertions.
 *
 * The type assertions need to be "tested" by linting them with typescript (`npx tsc --noEmit --pretty` with the tsconfig including the tests directory).
 *
 * This does not mean this can't be used in other test files, it can, just note it's not asserting anything, only "linting" (or your editor) will reveal any errors. Similarly, in the case of tests that only test types they should still be tested (i.e. named .spec) in case an assertion is accidentally added
 *
 * \*I prefer avoiding `ts-jest`. It does not work well with path aliases and usually I transpile with babel instead of typescript, and I want to test the code as it would be transpiled.
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
