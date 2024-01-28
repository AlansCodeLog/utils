import { expectType, testName } from "../../src/index.js"
import type { OrToAnd } from "../../src/types/index.js"
import { describe, expect, it } from "vitest"


describe(testName(), () => {
	it("{a: string} | {b: string} => { a: string } & { b: string }", () => {
		type Union = { a: string } | { b: string }
		type Intersection = { a: string } & { b: string }
		expectType<OrToAnd<Union>, "===", Intersection>(true)
	})
})
