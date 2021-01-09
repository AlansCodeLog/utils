/**
 * Returns the actual keys of an object when possible, otherwise what keyof would return.
 *
 * Basically if any key is set to a type like `{[key:string]}`, you won't get the individual keys. Also in this particular case with string you will get `(string | number)[]` (see {@link https://devblogs.microsoft.com/typescript/announcing-typescript-2-9-2/#support-for-symbols-and-numeric-literals-in-keyof-and-mapped-object-types keyofStringsOnly } for why). You can avoid this by using a `Record<string, string>` or passing the second type parameter to narrow the type of the keys extracted.
 *
 * Although it is not meant to be used with arrays, it can be, and will return `number[]` (even though technically it should be `string[]`, but then typescript would complain).
 */
export type Keys<
	T extends Record<any, any>,
	TKey extends string | number | symbol = string | number | symbol,
> =
	T extends any[]
	? number[]
	: T extends Record<any, any>
	? Extract<keyof T, TKey>[]
	: (keyof T)[]
