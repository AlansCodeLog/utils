import type { AnyFunction } from "@/types"
import { unreachable } from "@/utils"


export function getQueueKey(type: string, index: number | AnyFunction, args: any[]): string {
	switch (type) {
		case "function":
			return (index as AnyFunction)(args)
		case "number":
			return args[index as number]
		case "undefined":
			return "" // no key, singular debounce
		default:
			unreachable()
	}
}
