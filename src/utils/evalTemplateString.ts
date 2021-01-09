/**
 * Evals the arguments you get when using a template tag function.
 *
 * Useful when we want a template tag function to operate on the final value (e.g. adding/removing indentation).
 *
 */
export function evalTemplateString(template: TemplateStringsArray, substitutions: any[]): string {
	let res = ""
	for (let i = 0; i < template.length; i++) {
		const str = template[i]

		// we're relying on the coercion to correctly transform the variables like a template string would
		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		res += str + (i < substitutions.length ? substitutions[i] : "")
	}
	return res
}
