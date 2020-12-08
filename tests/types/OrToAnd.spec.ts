import { expect_type, test_name } from "@/testing"
import type { OrToAnd } from "@/types"


describe(test_name(), () => {
	it("{a: string} | {b: string} => { a: string } & { b: string }", () => {
		type Union = {a: string} | {b: string}
		type Intersection = { a: string } & { b: string }
		expect_type<OrToAnd<Union>, "===", Intersection>(true)
	})
})
