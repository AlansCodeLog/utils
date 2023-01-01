import path from "path"
import { escapeRegex } from "utils/escapeRegex.js"


/**
 * Used for getting the file name of a test spec (relative to the `tests/tests` folder) so it's one less thing we have to worry about when creating a new spec. Its name is just its filename (or if it's nested: folder/filename), making everything easier to find.
 *
 * ```ts
 * // tests/folder/someFile.spec.ts
 * describe(testName(), () => {})
 * // = folderSomeFile
 * ```
 *
 * You can set nest to false so it only prints the filename no matter how deeply it's nested:
 *
 * ```ts
 * // tests/folder/SomeFile.spec.ts
 * describe(testName({nest: false}), () => {})
 * // = someFile
 * ```
 *
 * By default we try to grab the name from the error stack, if that's failing for some reason, `__filename` can be passed:
 *
 * ```ts
 * describe(testName({__filename}), () => {})
 * ```
 *
 * Note: This function assumes the test directory is called test or tests and is in `process.cwd()`.
 *
 * It will throw if it can't find a test name.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function testName({ nest = true, __filename }: { nest?: boolean, __filename?: string } = {}, sep: string = path.sep): string {
	sep = path.sep === "\\" ? "\\\\" : "/"
	const regex = `${escapeRegex(path.resolve(process.cwd()))}${sep}(test|tests)${sep}`
	const regexp = new RegExp(regex, "i")

	const errorStack = (new Error()).stack
		?.split("\n")
		.find(line => line.match(regexp) !== null)
	// temporary backwards compatibility
	const regexOriginal = /\((.*?)\)/
	const regexFileRegex = /(\/.*\/.*?):/


	const filename = __filename ?? errorStack?.match(regexOriginal)?.[1] ?? errorStack?.match(regexFileRegex)?.[1]

	if (filename === undefined) throw new Error("Could not find test file path.")

	const filepath = filename.replace(/(\\|\/)/g, path.sep)

	const name = nest
		? path.relative(process.cwd(), filepath).match(/(?:test|tests)(?:\/|\\)(.*?(?:\/|\\)?.*?)\./)![1]
		: filepath.match(/.*(?:\/|\\)(.*?)\./)![1]

	return name
}
