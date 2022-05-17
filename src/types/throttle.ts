import type { DebounceQueue } from "."


export type Throttled<T extends (...args: any) => any> = ((...args: Parameters<T>) => void)
export type ThrottleQueue = DebounceQueue
