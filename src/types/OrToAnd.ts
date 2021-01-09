/** Converts a union type to an intersection. */
export type OrToAnd<TUnion> = (TUnion extends any
	? (k: TUnion) => void : never) extends ((k: infer I) => void)
	? I : never
