## ⏎ μWrap

A [10x faster](#performance) and more accurate text wrapping util in [1.5KB (min)](https://github.com/leeoniya/uWrap/blob/main/dist/uWrap.iife.min.js) _(MIT Licensed)_

---
### Introduction

uWrap was made to efficiently predict varying row heights for list and grid [virtualization](https://www.patterns.dev/vanilla/virtual-lists/) - a strategy for performance optimization when rendering large datasets.
Doing this both quickly and accurately turns out to be a non-trivial task, since Canvas2D provides no API for text wrapping, and `measureText()` is very expensive;
rendering to the DOM is also out of the question due to poor performance.
Additionally, font size, variable-width fonts, `letter-spacing`, explicit line breaks, and different `white-space` choices impact the exact number of lines in final result.

---
### Performance

[canvas-hypertxt](https://github.com/glideapps/canvas-hypertxt) looks to be the fastest similar utility.
uWrap handily out-performs it in both CPU and memory usage by a wide margin while being significantly _more_ accurate.

The benchmark below wraps 100k random sentances within boxes of random widths between 50px and 250px.
You can see this benchmark performed in the console on the [demo page](https://leeoniya.github.io/uWrap/demo/).

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

A 10 LoC [uWrap.d.ts](https://github.com/leeoniya/uWrap/blob/main/dist/uWrap.d.ts) TypeScript def.

---
### Usage

```js
// import util for wrapping variable-width fonts using pre-line strategy
import { varPreLine } from 'uwrap';

// create a Canvas2D context with desired font settings
let ctx = document.createElement('canvas').getContext('2d');
ctx.font = "14px Inter, sans-serif";
ctx.letterSpacing = '0.15px';

// init wrapper
let wrap = varPreLine(ctx);

// sample text
let text = 'The quick brown fox jumps over the lazy dog.';

// call wrapper with text to wrap, width of bounding container, and per-line callback
let lineCount = 0;
wrap(text, width, () => { count++; });

// or process the lines for rendering, etc..

let lines = [];
wrap(text, width, (idx0, idx1) => { lines.push(text.slice(idx0, idx1)); });
```