/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { test_name } from "@/testing"
import { eval_template_string } from "@/utils"
import { expect } from "@tests/chai"
import { complex_obj } from "@tests/test_helpers/constants"


let obj = { ...complex_obj, b: undefined }

function tag(template: TemplateStringsArray, ...substitutions: any[]): string {
	return eval_template_string(template, substitutions)
}

describe(test_name(), () => {
	it("no tests", () => {
		expect(tag`${obj}${obj[0]}${obj.a}${obj.b}${obj.c}${obj.d}${obj.e}${obj.f}${obj.g}${obj.h}${obj.i}${obj.j}${obj.k}${obj.l}${obj.m}`).to.equal(`${obj}${obj[0]}${obj.a}${obj.b}${obj.c}${obj.d}${obj.e}${obj.f}${obj.g}${obj.h}${obj.i}${obj.j}${obj.k}${obj.l}${obj.m}`)
	})
})
