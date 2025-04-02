"use strict";

// src/multi-line.ts
var resultCache = /* @__PURE__ */ new Map();
var metrics = /* @__PURE__ */ new Map();
var hyperMaps = /* @__PURE__ */ new Map();
function clearMultilineCache() {
  resultCache.clear();
  hyperMaps.clear();
  metrics.clear();
}
function backProp(text, realWidth, keyMap, temperature, avgSize) {
  var _a, _b, _c;
  let guessWidth = 0;
  const contribMap = {};
  for (const char of text) {
    const v = (_a = keyMap.get(char)) != null ? _a : avgSize;
    guessWidth += v;
    contribMap[char] = ((_b = contribMap[char]) != null ? _b : 0) + 1;
    ``;
  }
  const diff = realWidth - guessWidth;
  for (const key of Object.keys(contribMap)) {
    const numContribution = contribMap[key];
    const contribWidth = (_c = keyMap.get(key)) != null ? _c : avgSize;
    const contribAmount = contribWidth * numContribution / guessWidth;
    const adjustment = diff * contribAmount * temperature / numContribution;
    const newVal = contribWidth + adjustment;
    keyMap.set(key, newVal);
  }
}
function makeHyperMap(ctx, avgSize) {
  var _a;
  const result = /* @__PURE__ */ new Map();
  let total = 0;
  for (const char of "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.-+=?") {
    const w = ctx.measureText(char).width;
    result.set(char, w);
    total += w;
  }
  const avg = total / result.size;
  const damper = 3;
  const scaler = (avgSize / avg + damper) / (damper + 1);
  const keys = result.keys();
  for (const key of keys) {
    result.set(key, ((_a = result.get(key)) != null ? _a : avg) * scaler);
  }
  return result;
}
function measureText(ctx, text, fontStyle, hyperMode) {
  var _a, _b;
  const current = metrics.get(fontStyle);
  if (hyperMode && current !== void 0 && current.count > 2e4) {
    let hyperMap = hyperMaps.get(fontStyle);
    if (hyperMap === void 0) {
      hyperMap = makeHyperMap(ctx, current.size);
      hyperMaps.set(fontStyle, hyperMap);
    }
    if (current.count > 5e5) {
      let final = 0;
      for (const char of text) {
        final += (_a = hyperMap.get(char)) != null ? _a : current.size;
      }
      return final * 1.01;
    }
    const result2 = ctx.measureText(text);
    backProp(text, result2.width, hyperMap, Math.max(0.05, 1 - current.count / 2e5), current.size);
    metrics.set(fontStyle, {
      count: current.count + text.length,
      size: current.size
    });
    return result2.width;
  }
  const result = ctx.measureText(text);
  const avg = result.width / text.length;
  if (((_b = current == null ? void 0 : current.count) != null ? _b : 0) > 2e4) {
    return result.width;
  }
  if (current === void 0) {
    metrics.set(fontStyle, {
      count: text.length,
      size: avg
    });
  } else {
    const diff = avg - current.size;
    const contribution = text.length / (current.count + text.length);
    const newVal = current.size + diff * contribution;
    metrics.set(fontStyle, {
      count: current.count + text.length,
      size: newVal
    });
  }
  return result.width;
}
function getSplitPoint(ctx, text, width, fontStyle, totalWidth, measuredChars, hyperMode, getBreakOpportunities) {
  if (text.length <= 1)
    return text.length;
  if (totalWidth < width)
    return -1;
  let guess = Math.floor(width / totalWidth * measuredChars);
  let guessWidth = measureText(ctx, text.slice(0, Math.max(0, guess)), fontStyle, hyperMode);
  const oppos = getBreakOpportunities == null ? void 0 : getBreakOpportunities(text);
  if (guessWidth === width) {
  } else if (guessWidth < width) {
    while (guessWidth < width) {
      guess++;
      guessWidth = measureText(ctx, text.slice(0, Math.max(0, guess)), fontStyle, hyperMode);
    }
    guess--;
  } else {
    while (guessWidth > width) {
      const lastSpace = oppos !== void 0 ? 0 : text.lastIndexOf(" ", guess - 1);
      if (lastSpace > 0) {
        guess = lastSpace;
      } else {
        guess--;
      }
      guessWidth = measureText(ctx, text.slice(0, Math.max(0, guess)), fontStyle, hyperMode);
    }
  }
  if (text[guess] !== " ") {
    let greedyBreak = 0;
    if (oppos === void 0) {
      greedyBreak = text.lastIndexOf(" ", guess);
    } else {
      for (const o of oppos) {
        if (o > guess)
          break;
        greedyBreak = o;
      }
    }
    if (greedyBreak > 0) {
      guess = greedyBreak;
    }
  }
  return guess;
}
function splitMultilineText(ctx, value, fontStyle, width, hyperWrappingAllowed, getBreakOpportunities) {
  const key = `${value}_${fontStyle}_${width}px`;
  const cacheResult = resultCache.get(key);
  if (cacheResult !== void 0)
    return cacheResult;
  if (width <= 0) {
    return [];
  }
  let result = [];
  const encodedLines = value.split("\n");
  const fontMetrics = metrics.get(fontStyle);
  const safeLineGuess = fontMetrics === void 0 ? value.length : width / fontMetrics.size * 1.5;
  const hyperMode = hyperWrappingAllowed && fontMetrics !== void 0 && fontMetrics.count > 2e4;
  for (let line of encodedLines) {
    let textWidth = measureText(ctx, line.slice(0, Math.max(0, safeLineGuess)), fontStyle, hyperMode);
    let measuredChars = Math.min(line.length, safeLineGuess);
    if (textWidth <= width) {
      result.push(line);
    } else {
      while (textWidth > width) {
        const splitPoint = getSplitPoint(ctx, line, width, fontStyle, textWidth, measuredChars, hyperMode, getBreakOpportunities);
        const subLine = line.slice(0, Math.max(0, splitPoint));
        line = line.slice(subLine.length);
        result.push(subLine);
        textWidth = measureText(ctx, line.slice(0, Math.max(0, safeLineGuess)), fontStyle, hyperMode);
        measuredChars = Math.min(line.length, safeLineGuess);
      }
      if (textWidth > 0) {
        result.push(line);
      }
    }
  }
  result = result.map((l, i) => i === 0 ? l.trimEnd() : l.trim());
  resultCache.set(key, result);
  if (resultCache.size > 500) {
    resultCache.delete(resultCache.keys().next().value);
  }
  return result;
}
export {
  clearMultilineCache as clearCache,
  splitMultilineText as split
};
