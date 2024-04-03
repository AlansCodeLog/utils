import { describe, expect, it } from "vitest"

import type { MakeRequired } from "../../src/types/index.js"
import { expectType } from "../../src/utils/expectType.js"


it("works", () => {
	type Base = { a: string, b?: string, c?: { d?: string } }
	type Res = MakeRequired<Base, "c" | "b">
	expectType<Res, "===", { a: string, b: string, c: { d?: string } }>(true)
	expectType<Res, "===", { a: string, b?: string, c?: { d?: string } }>(false)
	expectType<Res, "===", { a: string, b: string, c: { d: string } }>(false)
	expectType<Res, "===", { a: string }>(false)
})
