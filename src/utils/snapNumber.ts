/**
 * The classic `Math.round(num / step) * step` for snapping numbers to a certain step.
 *
 * Can optionally round up ("ceil") or down ("floor").
 */
export function snapNumber(num: number, step: number, dir: "floor" | "ceil" | "round" = "round"): number {
	return Math[dir](num / step) * step
}
