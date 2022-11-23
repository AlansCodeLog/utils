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
