/** @packageDocumentation @module types-internal */

export type Debounced<T extends (...args: any) => any> = ((...args: Parameters<T>) => void)
// not sure why it's complaining? node env is set #todo
// eslint-disable-next-line no-undef
export type DebounceQueue = Record<string, { leading?: boolean, timeout?: NodeJS.Timeout | number }>
