/** @packageDocumentation @module retypes */
/**
 * Because 99.999999999999% of the time the default typescript behavior of typing the keys as string[] is annoying and useless.
 */
export const keys = Object.keys as <T>(o: T) => (Extract<keyof T, string>)[]
