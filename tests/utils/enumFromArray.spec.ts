import { it } from "vitest"

import {
	enumFromArray,
	expectType,
} from "../../src/index.js"


it("works", () => {
	const ERROR_ENUM = enumFromArray(["SOME_ERROR", "OTHER_ERROR"])
	expectType<typeof ERROR_ENUM, "===", {
		SOME_ERROR: "SOME_ERROR"
		OTHER_ERROR: "OTHER_ERROR"
	}>(true)
})
it("works with prefix", () => {
	const ERROR_ENUM = enumFromArray(["SOME_ERROR", "OTHER_ERROR"], "PREFIX_")
	expectType<typeof ERROR_ENUM, "===", {
		SOME_ERROR: "PREFIX_SOME_ERROR"
		OTHER_ERROR: "PREFIX_OTHER_ERROR"
	}>(true)
})
it("values can be used as keys in a type", () => {
	const ERROR_ENUM = enumFromArray(["SOME_ERROR", "OTHER_ERROR"], "PREFIX_")
	// eslint-disable-next-line @typescript-eslint/naming-convention
	type SOME_TYPE = {
		[ERROR_ENUM.SOME_ERROR]: string
	}
	expectType<SOME_TYPE, "===", {
		PREFIX_SOME_ERROR: string
	}>(true)
})
