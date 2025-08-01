/** may return false to exit loop early */
export type LineCallback = (idx0: number, idx1: number, width: number) => void | boolean;

/** invoke callback for each line with start/end idxs */
export type Each = (text: string, width: number, cb: LineCallback) => void;

/** split into lines array */
export type Split = (text: string, width: number, limit?: number) => string[];

/** count lines */
export type Count = (text: string, width: number) => number;

/** test whether text will wrap (line count > 1) */
export type Test = (text: string, width: number) => boolean;

export interface uWrap {
  each: Each;
  split: Split;
  count: Count;
  test: Test;
}

/** wrap text with a variable width font using pre-line whitespace strategy */
export function varPreLine(ctx: CanvasRenderingContext2D): uWrap;
