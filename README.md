## ⏎ μWrap

A [10x faster](#performance) and more accurate text wrapping util in [< 2KB (min)](https://github.com/leeoniya/uWrap/blob/main/dist/uWrap.iife.min.js) _(MIT Licensed)_

---
### Introduction

uWrap exists to efficiently predict varying row heights for list and grid [virtualization](https://www.patterns.dev/vanilla/virtual-lists/), a technique for UI performance optimization when rendering large, scrollable datasets.
Doing this both quickly and accurately turns out to be a non-trivial task since Canvas2D provides no API for text wrapping, and `measureText()` is quite expensive;
measuring via DOM is also a non-starter due to poor performance.
Additionally, font size, variable-width [kerning](https://www.canva.com/learn/kerning/), `letter-spacing`, explicit line breaks, and different `white-space` choices affect the wrapping locations.

Notes:

- Currently works most accurately with Latin charsets
- Does not yet handle Windows-style `\r\n` explicit line breaks
- Only `pre-line` wrapping strategy is implemented so far

---
### Performance

uWrap outperforms [canvas-hypertxt](https://github.com/glideapps/canvas-hypertxt) by a wide margin in both CPU and memory usage while being significantly more accurate.

The benchmark below wraps 100,000 random sentences into boxes of random widths between 50px and 250px.
You can see this live in DevTools console of the [demo page](https://leeoniya.github.io/uWrap/demo/).

<table>
  <tr>
    <th></th>
    <th>Chrome 135</th>
    <th>Firefox 137</th>
    <th>Safari 18.1</th>
  </tr>
  <tr>
    <td><a href="https://github.com/leeoniya/uWrap">uWrap</a></td>
    <td>82ms</td>
    <td>90ms</td>
    <td>185ms</td>
  </tr>
  <tr>
    <td><a href="https://github.com/glideapps/canvas-hypertxt">canvas-hypertxt</a></td>
    <td>770ms</td>
    <td>1660ms</td>
    <td>1430ms</td>
  </tr>
</table>

---
### Installation

```
npm i uwrap
```

or

```html
<script src="./dist/uWrap.iife.min.js"></script>
```

---
### API

See [uWrap.d.ts](https://github.com/leeoniya/uWrap/blob/main/dist/uWrap.d.ts) TypeScript def.

---
### Usage

```js
// import fn for wrapping variable-width fonts using pre-line strategy
import { varPreLine } from 'uwrap';

// create a Canvas2D context with desired font settings
let ctx = document.createElement('canvas').getContext('2d');
ctx.font = "14px Inter, sans-serif";
ctx.letterSpacing = '0.15px';

// init util fns
const { count, test, split } = varPreLine(ctx);

// example text
let text = 'The quick brown fox jumps over the lazy dog.';

// count lines
let numLines = count(text, width);

// test if text will wrap
let willWrap = test(text, width);

// split lines (with optional limit)
let lines = split(text, width, 3);
```