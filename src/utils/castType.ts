/**
 * Dummy function that casts a type for the remaining scope.
 *
 * ```ts
 * function (aOrB:"A"|"B") {
 *
 * 	if (aOrB.includes("A")) {// non narrowing condition
 * 		castType<"A">(aOrB)
 * 	} else {
 * 		castType<"B">(aOrB)
 * 	}
 * }
 *
 * ```
 * Ideally this would return the value as well, but due to [#34636](https://github.com/microsoft/TypeScript/issues/34636) and [#40562](https://github.com/microsoft/TypeScript/issues/40562)] this cannot be expressed in the type system.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function castType<T>(_value: any): asserts _value is T { }
