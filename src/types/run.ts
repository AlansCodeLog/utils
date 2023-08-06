import { type ErrorW } from "./ErrorW.js"


export type RunError = ErrorW<{
	code: any
	stdout: string
	stderr: string
	/** The combined stdout and stderr chunks combined in the order received as you would see it in the console if you ran it yourself. */
	data: string
}>
