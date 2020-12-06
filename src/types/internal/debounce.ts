/** @packageDocumentation @module types-internal */

export type Debounced<T extends (...args: any) => any> = ((...args: Parameters<T>) => void)
export type DebounceQueue = Record<string, { leading?: boolean, timeout?: NodeJS.Timeout | number }>
