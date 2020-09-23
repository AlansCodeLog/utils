/** @packageDocumentation @module utils */
import type { Mutable } from "@/types"

/**
 * Splices arrays at multiple positions and returns both the array and the removed elements for easier chaining.
 *
 * ```ts
 * let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *
 * // remove the first two elements
 * multisplice(array, [0, 1], 1)
 *
 * // using readonly arrays:
 * let readonly_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
 *
 * // don't mutate array, assign the new array returned to new_array
 * let { array: new_array, removed } = multisplice(readonly_array, [0, 1], 1, undefined, { mutate: false } )
 * // it's the same as this, but the type of new_array will be more correct (e.g. [1, 2, 3, ...]) without needing to cast it.
 * let { array: new_array, removed } = multisplice([...readonly_array] as Mutable<typeof readonly_array>,  [0, 1], 1)
 *
 * // don't mutate array, but re-use the variable:
 * ; ({ array } = multisplice(array, [0, 1], 1, undefined, { mutate: false }))
 * // if you're unfamiliar with this syntax: the parenthesis allow destructuring to already declared variables, the semi-colon is just because if you're not using semicolons, parenthesis at the start of lines can cause problems
 *
 * // using chaining
 * // unlike splice you can pick whether you want the array or the removed elements
 * multisplice(array, [0, 1], 1).array
 * 	.filter(() => {...})
 * 	.map(() => {...})
 *
 * ```
 *
 * Mutates the array by default, pass `{ mutate: false }` to shallow copy the array before splicing it.
 *
 * Deleting more than one item at a time at multiple positions is supported if the ranges created don't overlap:
 *
 * ```ts
 * let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
 * The function's types are setup to only take items to insert of the same type that the array already contains, so it will complain depending on what insert option you use. You can always cast the item/s as any and/or pass a different type for the second TArray type parameter. Since type parameter's can't be skipped (#awaiting [#10571](https://github.com/microsoft/TypeScript/issues/10571)), you must pass true or false to match the value of the mutate option, not boolean, as the first parameter.
 */

export function multisplice<
	TMutate extends true | false = true,
	TArray extends
		TMutate extends true ? any[] : readonly any[] =
		TMutate extends true ? any[] : readonly any[],
	TInsert extends
		MULTISPLICE_ITEM =
		MULTISPLICE_ITEM,
	TItems extends
		TInsert extends MULTISPLICE_ITEM.SINGLE ? TArray[number] : TArray[number][] =
		TInsert extends MULTISPLICE_ITEM.SINGLE ? TArray[number] : TArray[number][]
>(
	array: TArray,
	indexes: number | number[],
	count: number = 1,
	item?: TItems,
	{
		mutate = true as TMutate,
		insert = MULTISPLICE_ITEM.SINGLE as TInsert,
	}: {
		mutate?: TMutate
		insert?: TInsert
	} = {}
): {
		removed: Mutable<TArray>
		array: Mutable<TArray>
	} {
	if (typeof indexes === "number") indexes = [indexes]

	let arr = (!mutate ? [...array] : array) as any[]

	let inserts_items = item !== undefined
	let multiple_items = inserts_items && Array.isArray(item) && (insert === MULTISPLICE_ITEM.MATCH_INDEX || insert === MULTISPLICE_ITEM.MATCH_INDEX_LOOSE)
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	if (multiple_items && insert === MULTISPLICE_ITEM.MATCH_INDEX && item!.length !== indexes.length) {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		throw new Error(`To be able to match inserts by index, you must pass the same amount of items as indexes. You passed ${indexes.length} indexes and ${item!.length} items.`)
	}

	let total_inserted = 0
	let removed: TArray = [] as unknown as TArray
	for (let i = 0; i < indexes.length; i++) {
		let insert_count = (inserts_items ? total_inserted : 0)
		let delete_count = (i * count)
		let pos = indexes[i] - delete_count + insert_count

		let insertion = inserts_items
			? multiple_items
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
				? item![i]
				: item
				: undefined

		let do_insert =
				inserts_items &&
				( // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
					insert !== MULTISPLICE_ITEM.MATCH_INDEX_LOOSE || i < item!.length
				)

		let range_end = indexes[i + 1] && pos + count - 1
		let next_pos = indexes[i + 1] && (indexes[i + 1] + insert_count)


		if (range_end >= next_pos) {
			throw new Error(`Deleting ${count} elements at a time from position ${pos} would overlap with next calculated index: ${indexes[i + 1]}.\nCurrent state of array = ${arr.join(",")}`)
		}

		if (do_insert) total_inserted++
		// console.log(pos, array.length)

		if (pos >= arr.length && count > 0) {throw new Error(`Position ${pos}  to delete at is greater than array length.`)}
		// if we just passed the item to insert and it was undefined it would insert undefined
		let deleted = do_insert
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
	 * e.g. insert `[1,2,3]` at positions `[0,1,2]` in array `[1,2,3]  = [1, 1, 2, 2, 3, 3]`
	 */
	MATCH_INDEX = "MATCH_INDEX",
	/**
	 * Same as `MATCH_INDEX` but the length of the items array doesn't have to match.
	 * e.g. insert `[1,2]` at positions `[0,1,2]` in array `[1,2,3]  = [1, 1, 2, 2, 3]`
	 */
	MATCH_INDEX_LOOSE = "MATCH_INDEX_LOOSE"
}
