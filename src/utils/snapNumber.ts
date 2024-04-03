/**
 * The classic `Math.round(num / step) * step` for snapping numbers to a certain step.
 */
export function snapNumber(num: number, step: number): number {
	return Math.round(num / step) * step
}
