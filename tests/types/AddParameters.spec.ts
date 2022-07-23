import { testName } from "@/testing"
import type { AddParameters } from "@/types/AddParameters"


describe(testName(), () => {
	it("works", () => {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		function someFunc(param: string = "") {
			// eslint-disable-next-line prefer-rest-params
			const isRecursiveCall: boolean = arguments[1] ?? false
			const self = someFunc as any as AddParameters<typeof someFunc, [typeof isRecursiveCall]>
			// no error
			self(param, true)
		}
		// do not call someFunc, this is a type check only
	})
})