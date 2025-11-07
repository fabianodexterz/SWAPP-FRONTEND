export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
export const nearEq = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) <= eps;
