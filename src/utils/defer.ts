import type { AnyFunction } from "@/types"

/**
 * Wraps the given function in a defered promise, such that it will not execute until the promise is externally resolved. If you reject it, you must catch it.
 *
 * ```ts
 * const deferred = defer(async (message) => {
 *   console.log(message)
 * })
 *
 * // nothing happens at this point
 * deferred()
 * 	.then(() => console.log("after"))
 * 	.catch(() => console.log("catches deferred.reject"))
 *
 * deferred.resolve("message") // function logs
 * // or
 * deferred.reject() // above catch catches rejection
 *
 * ```
 */
export function defer<T extends AnyFunction = AnyFunction>(func: T): T & {
	resolve: (...args: Parameters<T>[0]) => void
	reject: (...args: any[]) => void
} {
	const promise = async (): Promise<void> =>
		new Promise((resolve, reject) => {
			// @ts-expect-error ignore
			promise.resolve = resolve
			// @ts-expect-error ignore
			promise.reject = reject
		}).then((res: Parameters<T>[0]) => func(res))

	return promise as any
}
