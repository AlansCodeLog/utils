/** @packageDocumentation @module testing */
import path from "path"


/**
 * Used for getting the file name of a test spec (relative to the `tests/tests` folder) so it's one less thing we have to worry about when creating a new spec. Its name is just its filename (or if it's nested: folder/filename), making everything easier to find.
 *
 * ```ts
 *	// tests/folder/some_file.spec.ts
 * describe(test_name(), () => {})
 * // = folder/some_file
 * ```
 *
 * You can set nest to false so it only prints the filename no matter how deeply it's nested:
 * ```ts
 *	// tests/folder/some_file.spec.ts
 * describe(test_name({nest: false}), () => {})
 * // = some_file
 * ```
 *
 * By default we try to grab the name from the error stack, if that's failing for some reason, `__filename` can be passed:
 * ```ts
 * describe(test_name({__filename}), () => {})
 * ```
 *
 * Note: This function assumes the test directory is called test/tests and is in `process.cwd()`.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function test_name({ nest = true, __filename }: { nest?: boolean, __filename?: string } = {}): string {
	let filename = __filename ?? (new Error()).stack
			?.split("\n")
			.find(line => line.includes(path.join(process.cwd(), "test")))
			?.match(/\((.*?)\)/)?.[1]

	if (filename === undefined) throw new Error("Could not find test file path.")
	let filepath = filename

	let name = nest
		? path.relative(process.cwd(), filepath).match(/(?:test|tests)(?:\/|\\)(.*?(?:\/|\\)?.*?)\./)![1]
		: filepath.match(/.*(?:\/|\\)(.*?)\./)![1]
	return name
}
