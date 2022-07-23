type ArrayLength<T extends any[]> = T extends { length: infer L } ? L : never
type LastItem<T extends any[]> = T[ArrayLength<T>]
/**
 * Returns last element of array.
 */
export function last<T extends any[]>(arr: T): LastItem<T> {
	return arr[arr.length - 1]
}
