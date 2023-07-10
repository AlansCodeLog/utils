import { type ChildProcessWithoutNullStreams, type CommonSpawnOptions, spawn } from "child_process"

import type { ErrorW } from "../types/index.js"
import { isArray } from "../utils/isArray.js"


/**
 * Async promisified spawn wrapper.
 *
 * ```ts
 * const res = await promise.catch(err => console.log(err)).promise.catch(err => console.log(err))
 *
 * // run returns an object so that the child process can be accessed if needed
 * const {promise, child} = run("some command", {...opts})
 * const res = await promise.catch(err => console.log(err))
 * ```
 *
 * Use `.catch` to catch errors. It will throw an {@link ErrorW `ErrorW`}`<{code:number, stdout:string>}` stdout is any output received before the error.
 *
 *	Command can also be an array.
 *
 * @env nodejs2
 */
export function run(command: string | string[], opts: Partial<Omit<CommonSpawnOptions, "pipe">> = {}): { promise: Promise<string>, child: ChildProcessWithoutNullStreams } {
	let child!: ChildProcessWithoutNullStreams

	const promise = (async () => {
		const parts = isArray(command) ? command : command.split(" ")

		child = spawn(parts[0], [...parts.slice(1)], { shell: true, ...opts, stdio: "pipe" })

		let data = ""
		for await (const chunk of child.stdout) {
			data += chunk as string
		}
		let error = ""
		for await (const chunk of child.stderr) {
			error += chunk as string
		}

		const code: number = await new Promise(resolve => {
			child.on("close", resolve)
		})

		if (code !== 0) {
			const err = new Error(error)
			;(err as ErrorW<{ code: any, data: string }>).code = code
			;(err as ErrorW<{ code: any, stdout: string }>).stdout = data
			throw err
		}

		return data
	})()
	return {
		promise,
		child,
	}
}
