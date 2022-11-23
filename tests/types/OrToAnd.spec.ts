import { describe, expect, it } from "vitest"

import { expectType, testName } from "@/testing"
import type { OrToAnd } from "@/types"


describe(testName(), () => {
	it("{a: string} | {b: string} => { a: string } & { b: string }", () => {
		type Union = { a: string } | { b: string }
		type Intersection = { a: string } & { b: string }
		expectType<OrToAnd<Union>, "===", Intersection>(true)
	})
})
