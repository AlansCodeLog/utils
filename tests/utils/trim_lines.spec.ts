import { expect } from "chai"

import { test_name } from "@/testing"
import { trim_lines } from "@/utils"


describe(test_name(), () => {
	it("works", () => {
		expect(trim_lines("\n")).to.equal("")
	})
	it("multiple lines", () => {
		expect(trim_lines("\n\n\n\n")).to.equal("")
	})
	it("multiple lines with text in between", () => {
		expect(trim_lines("\n\nText\n\n")).to.equal("Text")
	})
	it("multiple lines with text with newlines in between", () => {
		expect(trim_lines("\n\nText\nText\n\n")).to.equal("Text\nText")
	})
	it("multiple lines with text between with extra whitespace characters at the end", () => {
		expect(trim_lines("\n\nText\nText\n\n\t ")).to.equal("Text\nText")
	})
	it("multiple lines with text between with extra whitespace characters at the beginning (does not get trimmed", () => {
		expect(trim_lines("\n\t\nText\nText\n\n\t ")).to.equal("\t\nText\nText")
	})
})
