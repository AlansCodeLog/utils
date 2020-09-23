/** @packageDocumentation @module utils */

import { eval_template_string } from "./eval_template_string"
import { strip_indent } from "./strip_indent"
import { trim_lines } from "./trim_lines"

/**
 * "Crops" template strings to remove the excess whitespace needed to make the code more readable.
 *
 * At it's core it's just a template tag function that wraps around `strip_indent(trim_lines(str))` so it uses {@link strip_indent}'s defaults (i.e. it only strips tab indents).
 */
export function crop(template: TemplateStringsArray, ...substitutions: any[]): string {
	return strip_indent(trim_lines(eval_template_string(template, substitutions)))
}

