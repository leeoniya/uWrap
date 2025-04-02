/** may return false to halt wrapping */
export type LineCallback = (idx0: number, idx1: number) => void | boolean;

export type Wrapper = (text: string, width: number, cb: (idx0: number, idx1: number) => void) => void;

export function varPreLine(ctx: CanvasRenderingContext2D): Wrapper;