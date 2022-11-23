import { describe, expect, it } from "vitest"

import { testName } from "@/testing"
import { trimLines } from "@/utils"


describe(testName(), () => {
	it("works", () => {
		expect(trimLines("\n")).to.equal("")
	})
	it("multiple lines", () => {
		expect(trimLines("\n\n\n\n")).to.equal("")
	})
	it("multiple lines with text in between", () => {
		expect(trimLines("\n\nText\n\n")).to.equal("Text")
	})
	it("multiple lines with text with newlines in between", () => {
		expect(trimLines("\n\nText\nText\n\n")).to.equal("Text\nText")
	})
	it("multiple lines with text between with extra whitespace characters at the end", () => {
		expect(trimLines("\n\nText\nText\n\n\t ")).to.equal("Text\nText")
	})
	it("multiple lines with text between with extra whitespace characters at the beginning (does not get trimmed", () => {
		expect(trimLines("\n\t\nText\nText\n\n\t ")).to.equal("\t\nText\nText")
	})
})
