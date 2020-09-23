/** @packageDocumentation @module utils */

/** Evals the arguments you get when using a template tag function. */
export function eval_template_string(template: TemplateStringsArray, substitutions: any[]): string {
	let res = ""
	for (let i = 0; i < template.length; i++) {
		let str = template[i]

		// we're relying on the coercion to correctly transform the variables like a template string would
		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		res += str + (i < substitutions.length ? substitutions[i] : "")
	}
	return res
}
