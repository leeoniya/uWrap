/**
* Copyright (c) 2025, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* uWrap.js
* A small, fast line wrapping thing for Canvas2D
* https://github.com/leeoniya/uWrap (v0.1.1)
*/

// BREAKS
const D = "-".charCodeAt(0);
const S = " ".charCodeAt(0);
const N = "\n".charCodeAt(0);
// const R = "\r".charCodeAt(0); (TODO: support \r\n breaks)
// const T = "\t".charCodeAt(0);
const SYMBS = `\`~!@#$%^&*()_+-=[]\\{}|;':",./<>? \t`;
const NUMS = "1234567890";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const CHARS = `${UPPER}${LOWER}${NUMS}${SYMBS}`;
function supportsLetterSpacing(ctx) {
    const _w = ctx.measureText('W').width;
    const _letterSpacing = ctx.letterSpacing;
    ctx.letterSpacing = '101px';
    const w = ctx.measureText('W').width;
    ctx.letterSpacing = _letterSpacing;
    return w > _w;
}
function varPreLine(ctx) {
    // Safari pre-18.4 does not support Canvas letterSpacing, and measureText() does not account for it
    // so we have to add it manually. https://caniuse.com/mdn-api_canvasrenderingcontext2d_letterspacing
    const fauxLetterSpacing = !supportsLetterSpacing(ctx) ? parseFloat(ctx.letterSpacing) : 0;
    // single-char widths in isolation
    const WIDTHS = {};
    for (let i = 0; i < CHARS.length; i++)
        WIDTHS[CHARS.charCodeAt(i)] = ctx.measureText(CHARS[i]).width + fauxLetterSpacing;
    const wordSpacing = parseFloat(ctx.wordSpacing);
    if (wordSpacing > 0)
        WIDTHS[S] = wordSpacing;
    // build kerning/spacing LUT of upper+lower, upper+sym, upper+upper pairs. (this includes letterSpacing)
    // holds kerning-adjusted width of the uppers
    const PAIRS = {};
    for (let i = 0; i < UPPER.length; i++) {
        let uc = UPPER.charCodeAt(i);
        PAIRS[uc] = {};
        for (let j = 0; j < CHARS.length; j++) {
            let ch = CHARS.charCodeAt(j);
            let wid = ctx.measureText(`${UPPER[i]}${CHARS[j]}`).width - WIDTHS[ch] + fauxLetterSpacing;
            PAIRS[uc][ch] = wid;
        }
    }
    const eachLine = () => { };
    function each(text, width, cb = eachLine) {
        let fr = 0;
        while (text.charCodeAt(fr) === S)
            fr++;
        let to = text.length - 1;
        while (text.charCodeAt(to) === S)
            to--;
        let headIdx = fr;
        let headEnd = 0;
        let headWid = 0;
        let tailIdx = -1; // wrap candidate
        let tailWid = 0;
        let inWS = false;
        for (let i = fr; i <= to; i++) {
            let c = text.charCodeAt(i);
            let w = 0;
            if (c in PAIRS) {
                let n = text.charCodeAt(i + 1);
                if (n in PAIRS[c])
                    w = PAIRS[c][n];
            }
            if (w === 0)
                w = WIDTHS[c] ?? (WIDTHS[c] = ctx.measureText(text[i]).width);
            if (c === S) { //  || c === T || c === N || c === R
                // set possible wrap point
                if (text.charCodeAt(i + 1) !== c) {
                    tailIdx = i + 1;
                    tailWid = 0;
                }
                if (!inWS && headWid > 0) {
                    headWid += w;
                    headEnd = i;
                }
                inWS = true;
            }
            else if (c === N) {
                if (cb(headIdx, i) === false)
                    return;
                headIdx = headEnd = i + 1;
                headWid = tailWid = 0;
                tailWid = 0;
                tailIdx = -1;
            }
            else {
                if (headEnd > headIdx && headWid + w > width) {
                    if (cb(headIdx, headEnd) === false)
                        return;
                    headWid = tailWid + w;
                    headIdx = headEnd = tailIdx;
                    tailWid = 0;
                    tailIdx = -1;
                }
                else {
                    if (c === D) {
                        // set possible wrap point
                        if (text.charCodeAt(i + 1) !== c) {
                            tailIdx = headEnd = i + 1;
                            tailWid = 0;
                        }
                    }
                    headWid += w;
                    tailWid += w;
                }
                inWS = false;
            }
        }
        cb(headIdx, to + 1);
    }
    let mayWrap = /\s|-/;
    return {
        each,
        split: (text, width, limit = Infinity) => {
            let out = [];
            if (mayWrap.test(text)) {
                each(text, width, (idx0, idx1) => {
                    out.push(text.slice(idx0, idx1));
                    if (out.length === limit)
                        return false;
                });
            }
            else {
                out.push(text);
            }
            return out;
        },
        count: (text, width) => {
            let count = 0;
            if (mayWrap.test(text)) {
                each(text, width, () => { count++; });
            }
            else {
                count = 1;
            }
            return count;
        },
        test: (text, width) => {
            let count = 0;
            if (mayWrap.test(text)) {
                each(text, width, () => {
                    if (++count === 2)
                        return false;
                });
            }
            else {
                count = 1;
            }
            return count === 2;
        },
    };
}
/*
function isMonospace(ctx: CanvasRenderingContext2D) {
  let w = ctx.measureText('.').width;
  return ctx.measureText('i').width === w && ctx.measureText('.').width === w;
}
*/

export { varPreLine };
