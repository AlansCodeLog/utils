import {
	type ChildProcess,
	type ChildProcessWithoutNullStreams,
	type CommonSpawnOptions,
	spawn,
} from "child_process"

import { castType } from "./castType.js"
import { isArray } from "./isArray.js"

import type { RunError } from "../types/index.js"


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
 * @env nodejs
 */
export function run(
	command: string | string[],
	/** Note that if you override `stdio` in `opts` to just `inherit`, the resulting data will be empty. */
	opts: Partial<Omit<CommonSpawnOptions, "pipe">> = {},
	/** A callback for the combined `stdout` and `stderr` streams. */
	cb?: (chunk: string) => void,
): {
		promise: Promise<string>
		child: ChildProcessWithoutNullStreams | ChildProcess
	} {
	let child!: ChildProcessWithoutNullStreams | ChildProcess

	const promise = (async () => {
		const parts = isArray(command) ? command : command.split(" ")

		child = spawn(parts[0], [...parts.slice(1)], {
			shell: true,
			stdio: "pipe",
			...opts,
		})

		let data = ""
		let stdout = ""
		let stderr = ""

		child.stdout?.on("data", (chunk: string) => {
			stdout += chunk
			data += chunk
			if (cb) cb(chunk)
		})
		
		child.stderr?.on("data", (chunk: string) => {
			stderr += chunk
			data += chunk
			if (cb) cb(chunk)
		})
		
		const code: number = await new Promise(resolve => {
			child.on("close", err => {
				resolve(err ?? 0)
			})
			child.on("exit", err => {
				resolve(err ?? 0)
			})
		})

		if (code !== 0 || stderr !== "") {
			const err = new Error(stderr !== "" ? stderr : data)
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
export type * from "../types/run.js"
