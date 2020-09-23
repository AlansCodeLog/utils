/** @packageDocumentation @module types */

/** The type of any class. */
export type AnyClass<T extends any = any> = new(...args: any[]) => T
