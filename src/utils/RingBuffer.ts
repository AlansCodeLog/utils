/**
 * A simple ring buffer. Not particularly fast. Use a library if you need speed.
 *
 * Type must be specified at construction, otherwise we can't know the type of items and it will be unknown[].
 */
export class RingBuffer<T> {
	size: number = 100

	items: T[] = [] as T[]

	constructor(
		size: RingBuffer<T>["size"] = 100,
		items: T[] = [] as T[]
	) {
		this.size = size
		this.items = items
		if (size <= 0) {
			throw new Error("Size must be greater than 0")
		}
		if (items.length > size) {
			throw new Error("Initial array cannot be larger than size.")
		}
	}

	push(item: T): number {
		this.items.push(item)
		if (this.items.length > this.size) {
			this.items.shift()
		}
		return this.items.length
	}

	clear(): void {
		this.items.length = 0
	}
}
