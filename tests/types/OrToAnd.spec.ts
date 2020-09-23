import { expect } from "chai"
import { expectType, TypeEqual } from "ts-expect"

import { test_name } from "@/testing"
import type { OrToAnd } from "@/types"


describe(test_name(), () => {
	it("{a: string} | {b: string} => { a: string } & { b: string }", () => {
		type Union = {a: string} | {b: string}
		type Intersection = { a: string } & { b: string }
		expectType<TypeEqual<OrToAnd<Union>, Intersection>>(true)
	})
})
