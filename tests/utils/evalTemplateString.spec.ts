/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
import { evalTemplateString, testName } from "index.js"
import { describe, expect, it } from "vitest"

import { complexObj } from "../_helpers/constants.js"


const obj = { ...complexObj, b: undefined }

function tag(template: TemplateStringsArray, ...substitutions: any[]): string {
	return evalTemplateString(template, substitutions)
}

describe(testName(), () => {
	it("no tests", () => {
		expect(tag`${obj}${obj[0]}${obj.a}${obj.b}${obj.c}${obj.d}${obj.e}${obj.f}${obj.g}${obj.h}${obj.i}${obj.j}${obj.k}${obj.l}${obj.m}`).to.equal(`${obj}${obj[0]}${obj.a}${obj.b}${obj.c}${obj.d}${obj.e}${obj.f}${obj.g}${obj.h}${obj.i}${obj.j}${obj.k}${obj.l}${obj.m}`)
	})
})
