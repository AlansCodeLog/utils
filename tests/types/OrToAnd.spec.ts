import { describe, expect, it } from "vitest"

import type { OrToAnd } from "../../src/types/index.js"
import { expectType } from "../../src/utils/expectType.js"


it("{a: string} | {b: string} => { a: string } & { b: string }", () => {
	type Union = { a: string } | { b: string }
	type Intersection = { a: string } & { b: string }
	expectType<OrToAnd<Union>, "===", Intersection>(true)
})
