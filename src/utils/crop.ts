import { evalTemplateString } from "./evalTemplateString.js"
import { stripIndent } from "./stripIndent.js"
import { trimLines } from "./trimLines.js"

/**
 * "Crops" template strings to remove the excess whitespace needed to make the code more readable.
 *
 * At it's core it's just a template tag function that wraps around `stripIndent(trimLines(str))` so it uses {@link stripIndent}'s defaults (i.e. it only strips tab indents).
 */
export function crop(template: TemplateStringsArray, ...substitutions: any[]): string {
	return stripIndent(trimLines(evalTemplateString(template, substitutions)))
}

