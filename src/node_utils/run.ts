import { type ChildProcessWithoutNullStreams, type CommonSpawnOptions, spawn } from "child_process"

import type { RunError } from "../types/index.js"
import { castType } from "../utils/castType.js"
import { isArray } from "../utils/isArray.js"


/**
 * Async promisified spawn wrapper.
 *
 * ```ts
 * const res = await promise.catch(err => console.log(err)).promise.catch(err => console.log(err))
 *
 * // run returns an object so that the child process can be accessed if needed
 * const {promise, child} = run("some command", {...opts})
 * const res = await promise.catch((err:RunError) => console.log(err))
 * ```
 *
 * Use `.catch` to catch errors. It will throw an {@link RunError `RunError`} if the program errors.
 *
 * A program is considered to have errored if it exits with a non-zero code OR it writes to stderr. The combined `stdout` and `stderr` strings as received are available in `err.data` to be able to see the output as it would appear in the console.
 *
 *	Command can also be an array.
 *
 * @env nodejs2
 */
export function run(
	command: string | string[],
	opts: Partial<Omit<CommonSpawnOptions, "pipe">> = {},
	/** A callback for the combined `stdout` and `stderr` streams. */
	cb?: (chunk: string) => void
): {
		promise: Promise<string>
		child: ChildProcessWithoutNullStreams
	} {
	let child!: ChildProcessWithoutNullStreams

	const promise = (async () => {
		const parts = isArray(command) ? command : command.split(" ")

		child = spawn(parts[0], [...parts.slice(1)], { shell: true, ...opts, stdio: "pipe" })

		let data = ""
		let stdout = ""
		let stderr = ""

		child.stdout.on("data", (chunk: string) => {
			stdout += chunk
			data += chunk
			if (cb) cb(chunk)
		})
		
		child.stderr.on("data", (chunk: string) => {
			stderr += chunk
			data += chunk
			if (cb) cb(chunk)
		})
		
		const code: number = await new Promise(resolve => {
			child.on("close", resolve)
		})

		if (code !== 0 || stderr !== "") {
			const err = new Error(stderr)
			castType<RunError>(err)
			err.code = code
			err.data = data
			err.stdout = stdout
			err.stderr = stderr
			throw err
		}

		return stdout
	})()
	return {
		promise,
		child,
	}
}
