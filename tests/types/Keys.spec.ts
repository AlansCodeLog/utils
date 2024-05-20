import { describe, expect, it } from "vitest"

import { expectType } from "../../src/indexTesting.js"
import type { Keys, MakeRequired } from "../../src/types/index.js"


it("works", () => {
	type Base = { a: string, b: string, c: string }
	expectType<Keys<Base>, "===", ("a" | "b" | "c")[]>(true)
})
