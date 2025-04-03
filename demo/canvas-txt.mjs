function B({
  ctx: e,
  line: c,
  spaceWidth: p,
  spaceChar: n,
  width: a
}) {
  const i = c.trim(), o = i.split(/\s+/), s = o.length - 1;
  if (s === 0)
    return i;
  const m = e.measureText(o.join("")).width, d = (a - m) / p, b = Math.floor(d / s);
  if (d < 1)
    return i;
  const r = n.repeat(b);
  return o.join(r);
}
const W = " ";
function k({
  ctx: e,
  text: c,
  justify: p,
  width: n
}) {
  const a = /* @__PURE__ */ new Map(), i = (r) => {
    let g = a.get(r);
    return g !== void 0 || (g = e.measureText(r).width, a.set(r, g)), g;
  };
  let o = [], s = c.split(`
`);
  const m = p ? i(W) : 0;
  let d = 0, b = 0;
  for (const r of s) {
    let g = i(r);
    const y = r.length;
    if (g <= n) {
      o.push(r);
      continue;
    }
    let h = r, t, f, l = "";
    for (; g > n; ) {
      if (d++, t = b, f = t === 0 ? 0 : i(r.substring(0, t)), f < n)
        for (; f < n && t < y && (t++, f = i(h.substring(0, t)), t !== y); )
          ;
      else if (f > n)
        for (; f > n && (t = Math.max(1, t - 1), f = i(h.substring(0, t)), !(t === 0 || t === 1)); )
          ;
      if (b = Math.round(
        b + (t - b) / d
      ), t--, t > 0) {
        let u = t;
        if (h.substring(u, u + 1) != " ") {
          for (; h.substring(u, u + 1) != " " && u >= 0; )
            u--;
          u > 0 && (t = u);
        }
      }
      t === 0 && (t = 1), l = h.substring(0, t), l = p ? B({
        ctx: e,
        line: l,
        spaceWidth: m,
        spaceChar: W,
        width: n
      }) : l, o.push(l), h = h.substring(t), g = i(h);
    }
    g > 0 && (l = p ? B({
      ctx: e,
      line: h,
      spaceWidth: m,
      spaceChar: W,
      width: n
    }) : h, o.push(l));
  }
  return o;
}
function H({
  ctx: e,
  text: c,
  style: p
}) {
  const n = e.textBaseline, a = e.font;
  e.textBaseline = "bottom", e.font = p;
  const { actualBoundingBoxAscent: i } = e.measureText(c);
  return e.textBaseline = n, e.font = a, i;
}
const C = {
  debug: !1,
  align: "center",
  vAlign: "middle",
  fontSize: 14,
  fontWeight: "",
  fontStyle: "",
  fontVariant: "",
  font: "Arial",
  lineHeight: null,
  justify: !1
};
function E(e, c, p) {
  const { width: n, height: a, x: i, y: o } = p, s = { ...C, ...p };
  if (n <= 0 || a <= 0 || s.fontSize <= 0)
    return { height: 0 };
  const m = i + n, d = o + a, { fontStyle: b, fontVariant: r, fontWeight: g, fontSize: y, font: h } = s, t = `${b} ${r} ${g} ${y}px ${h}`;
  e.font = t;
  let f = o + a / 2 + s.fontSize / 2, l;
  s.align === "right" ? (l = m, e.textAlign = "right") : s.align === "left" ? (l = i, e.textAlign = "left") : (l = i + n / 2, e.textAlign = "center");
  const u = k({
    ctx: e,
    text: c,
    justify: s.justify,
    width: n
  }), S = s.lineHeight ? s.lineHeight : H({ ctx: e, text: "M", style: t }), v = S * (u.length - 1), P = v / 2;
  let A = o;
  if (s.vAlign === "top" ? (e.textBaseline = "top", f = o) : s.vAlign === "bottom" ? (e.textBaseline = "bottom", f = d - v, A = d) : (e.textBaseline = "bottom", A = o + a / 2, f -= P), u.forEach((T) => {
    T = T.trim(), e.fillText(T, l, f), f += S;
  }), s.debug) {
    const T = "#0C8CE9";
    e.lineWidth = 1, e.strokeStyle = T, e.strokeRect(i, o, n, a), e.lineWidth = 1, e.strokeStyle = T, e.beginPath(), e.moveTo(l, o), e.lineTo(l, d), e.stroke(), e.strokeStyle = T, e.beginPath(), e.moveTo(i, A), e.lineTo(m, A), e.stroke();
  }
  return { height: v + S };
}
export {
  E as drawText,
  H as getTextHeight,
  k as splitText
};
