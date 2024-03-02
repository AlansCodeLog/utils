import type { MultispliceItem, Mutable } from "../types/index.js"


/**
 * Splices arrays at multiple positions and returns both the array and the removed elements for easier chaining.
 *
 * ```ts
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *
 * // remove the first two elements
 * multisplice(array, [0, 1], 1)
 *
 * //optionally destructure the return to extract removed elements
 * const {removed} = multisplice(array, [0, 1], 1)
 *
 * // using chaining
 * // unlike splice you can pick whether you want the array or the removed elements
 * multisplice(array, [0, 1], 1).array
 * 	.filter(() => {...})
 * 	.map(() => {...})
 *
 * // splice without mutating
 * const {removed, array: splicedArray} =  multisplice([...array], [0, 1], 1)
 * ```
 *
 * Deleting more than one item at a time at multiple positions is supported if the ranges created don't overlaps:
 *
 * ```ts
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *
 * // deleting 1 item at positions 0, 1 = OK
 * // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * // [ ][ ]
 *
 * // delete 2 items at positions 0, 1 = ERROR
 * // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * // [    ]
 * //    [    ]
 *
 * // delete 10000 items at position 9 = OK (because splice allows it)
 * // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * //                             [...
 * ```
 *
 * You can also insert items. By default they are inserted as they are at each index position passed. Use the `insert` option if you want to match the items in an array of items to each index position. See {@link MULTISPLICE_ITEM} for details.
 *
 * The function's types are setup to only take items to insert of the same type that the array already contains, so it will complain depending on what insert option you use. You can always cast the item/s as any and/or pass a different type for the TArray type parameter.
 */

export function multisplice<
	TArray extends any[] = any[],
	TInsert extends
	MultispliceItem =
	MultispliceItem,
	TItems extends
	TInsert extends MULTISPLICE_ITEM.SINGLE ? TArray[number] : TArray[number][] =
	TInsert extends MULTISPLICE_ITEM.SINGLE ? TArray[number] : TArray[number][],
>(
	array: TArray,
	indexes: number | number[],
	count: number = 1,
	item?: TItems,
	{
		insert = MULTISPLICE_ITEM.SINGLE as TInsert,
	}: {
		/** See {@link MULTISPLICE_ITEM}. */
		insert?: TInsert
	} = {}
): {
		removed: Mutable<TArray>
		array: Mutable<TArray>
	} {
	if (typeof indexes === "number") indexes = [indexes]

	const arr = array as any[]

	const insertItems = item !== undefined
	const multipleItems = insertItems && Array.isArray(item) && (insert === MULTISPLICE_ITEM.MATCH_INDEX || insert === MULTISPLICE_ITEM.MATCH_INDEX_LOOSE)

	if (multipleItems && insert === MULTISPLICE_ITEM.MATCH_INDEX && item!.length !== indexes.length) {
		throw new Error(`To be able to match inserts by index, you must pass the same amount of items as indexes. You passed ${indexes.length} indexes and ${item!.length} items.`)
	}

	let totalInserted = 0
	let removed: TArray = [] as unknown as TArray
	for (let i = 0; i < indexes.length; i++) {
		const insertCount = (insertItems ? totalInserted : 0)
		const deleteCount = (i * count)
		const pos = indexes[i] - deleteCount + insertCount

		const insertion = insertItems
			? multipleItems

				? item![i]
				: item
			: undefined

		const doInsert =
			insertItems &&
			(
				insert !== MULTISPLICE_ITEM.MATCH_INDEX_LOOSE || i < item!.length
			)

		const rangeEnd = indexes[i + 1] && pos + count - 1
		const nextPos = indexes[i + 1] && (indexes[i + 1] + insertCount)


		if (rangeEnd >= nextPos) {
			throw new Error(`Deleting ${count} elements at a time from position ${pos} would overlap with next calculated index: ${indexes[i + 1]}.\nCurrent state of array = ${arr.join(",")}`)
		}

		if (doInsert) totalInserted++
		// console.log(pos, array.length)

		if (pos >= arr.length && count > 0) { throw new Error(`Position ${pos}  to delete at is greater than array length.`) }
		// if we just passed the item to insert and it was undefined it would insert undefined
		const deleted = doInsert
			? arr.splice(pos, count, insertion)
			: arr.splice(pos, count)

		removed = removed.concat(deleted) as TArray
	}
	return { removed, array: arr as any }
}

export enum MULTISPLICE_ITEM {
	/**
	 * Inserts the item/s as they are in the given positions.
	 * e.g. insert `0` at positions `[0,1]` in array `[1,2,3]  = [0, 1, 0, 2, 3]`
	 */
	SINGLE = "SINGLE",
	/**
	 * Items needs to be an array. Inserts each item of the array at the corresponding indexes passed. The length of the items array and the indexes passed must be the same.
	 * e.g. insert `[1,2,3]` at positions `[0,1,2]` in array `[1,2,3]` = `[1, 1, 2, 2, 3, 3]`
	 */
	MATCH_INDEX = "MATCH_INDEX",
	/**
	 * Same as `MATCH_INDEX` but the length of the items array doesn't have to match.
	 * e.g. insert `[1,2]` at positions `[0,1,2]` in array `[1,2,3]  = [1, 1, 2, 2, 3]`
	 */
	MATCH_INDEX_LOOSE = "MATCH_INDEX_LOOSE",
}
