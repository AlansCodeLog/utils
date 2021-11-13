import { spawn } from "child_process"

import type { ErrorW } from "@/types"


/**
 * Async promisified spawn wrapper.
 *
 * ```ts
 * const res = await run("some command").catch(err => "")
 * ```
 *
 * Use `.catch` to catch errors. It will throw an {@link ErrorW `ErrorW`}`<{code:number>}`.
 *
 * @env nodejs
 */
export async function run(command: string, cwd?: string): Promise<string> {
	const parts = command.split(" ")

	const child = spawn(parts[0], [...parts.slice(1)], { cwd, shell: true })

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
		const err = new Error(`${code}, ${error}`)
		;(err as ErrorW<{ code: any }>).code = code
		throw err
	}

	return data
}
