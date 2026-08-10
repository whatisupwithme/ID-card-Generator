export const GREEN = '#0B4A2F';
export const DEEP = '#063521';
export const CREAM = '#F6E9C6';
export const SAND = '#E4D6AE';
export const YELLOW = '#FFD21E';
export const PINK = '#F0186B';
export const LEAF = '#A6D96A';
export const LEAF_DEEP = '#0E5B34';

export const DISPLAY = 'Anton, sans-serif';
export const MONO = '"IBM Plex Mono", ui-monospace, monospace';

type Ctx = CanvasRenderingContext2D;

/** Deterministic pseudo-random so exports never flicker between renders. */
export function seeded(seed: number): () => number {
  let s = Math.floor(Math.abs(seed)) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = s * 16807 % 2147483647) / 2147483647;
}

export function hashString(input: string): number {
  let hash = 17;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) % 987654321;
  }
  return hash;
}

export function roundRect(
ctx: Ctx,
x: number,
y: number,
w: number,
h: number,
r: number)
: void {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export function fillRoundRect(
ctx: Ctx,
x: number,
y: number,
w: number,
h: number,
r: number,
fill: string)
: void {
  roundRect(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}

export function strokeRoundRect(
ctx: Ctx,
x: number,
y: number,
w: number,
h: number,
r: number,
color: string,
width: number)
: void {
  roundRect(ctx, x, y, w, h, r);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function strokeCircle(
ctx: Ctx,
cx: number,
cy: number,
r: number,
color: string,
width: number)
: void {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function strokeArc(
ctx: Ctx,
cx: number,
cy: number,
r: number,
start: number,
end: number,
color: string,
width: number)
: void {
  ctx.beginPath();
  ctx.arc(cx, cy, r, start, end);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function annulus(
ctx: Ctx,
cx: number,
cy: number,
rOuter: number,
rInner: number,
fill: string)
: void {
  ctx.beginPath();
  ctx.arc(cx, cy, rOuter, 0, Math.PI * 2, false);
  ctx.arc(cx, cy, rInner, Math.PI * 2, 0, true);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill('evenodd');
}

export function stripes(
ctx: Ctx,
w: number,
h: number,
color: string,
gap: number,
thickness: number)
: void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  for (let i = -h; i < w + h; i += gap) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
    ctx.stroke();
  }
  ctx.restore();
}

/** Draws an image "cover" style inside a box, with zoom and normalized offsets. */
export function drawCover(
ctx: Ctx,
img: HTMLImageElement,
x: number,
y: number,
w: number,
h: number,
zoom = 1,
ox = 0,
oy = 0)
: void {
  const base = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const scale = base * zoom;
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  const dx = x + (w - dw) / 2 + ox * w;
  const dy = y + (h - dh) / 2 + oy * h;
  ctx.drawImage(img, dx, dy, dw, dh);
}

/** Manual letter-spacing so tracking is identical across browsers. */
export function trackedText(
ctx: Ctx,
text: string,
x: number,
y: number,
tracking: number,
align: 'left' | 'center' | 'right' = 'left')
: number {
  const chars = Array.from(text);
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total =
  widths.reduce((a, b) => a + b, 0) + tracking * Math.max(chars.length - 1, 0);
  let cursor = x;
  if (align === 'center') cursor = x - total / 2;
  if (align === 'right') cursor = x - total;
  const prevAlign = ctx.textAlign;
  ctx.textAlign = 'left';
  chars.forEach((c, i) => {
    ctx.fillText(c, cursor, y);
    cursor += widths[i] + tracking;
  });
  ctx.textAlign = prevAlign;
  return total;
}

export function trackedWidth(ctx: Ctx, text: string, tracking: number): number {
  const chars = Array.from(text);
  return (
    chars.reduce((a, c) => a + ctx.measureText(c).width, 0) +
    tracking * Math.max(chars.length - 1, 0));

}

/** Shrinks the font until the text fits maxWidth. Returns the chosen size. */
export function fitFont(
ctx: Ctx,
text: string,
maxWidth: number,
maxSize: number,
family: string,
tracking = 0,
minSize = 12)
: number {
  let size = maxSize;
  ctx.font = `${size}px ${family}`;
  while (trackedWidth(ctx, text, tracking) > maxWidth && size > minSize) {
    size -= 1;
    ctx.font = `${size}px ${family}`;
  }
  return size;
}

/** Draws text that always fits its column, shrinking as needed. */
export function fittedText(
ctx: Ctx,
text: string,
x: number,
y: number,
maxWidth: number,
maxSize: number,
family: string,
color: string,
tracking = 0,
align: 'left' | 'center' | 'right' = 'left',
minSize = 11)
: void {
  const size = fitFont(ctx, text, maxWidth, maxSize, family, tracking, minSize);
  ctx.font = `${size}px ${family}`;
  ctx.fillStyle = color;
  trackedText(ctx, text, x, y, tracking, align);
}

export function sunburst(
ctx: Ctx,
cx: number,
cy: number,
r0: number,
r1: number,
count: number,
color: string,
width: number)
: void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  for (let i = 0; i < count; i++) {
    const a = i / count * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
    ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.stroke();
  }
  ctx.restore();
}

/** A rising half sun with rays, used as a soft watermark. */
export function risingSun(
ctx: Ctx,
cx: number,
cy: number,
r: number,
fill: string,
rayColor: string)
: void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = rayColor;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  for (let i = 0; i <= 6; i++) {
    const a = Math.PI + i / 6 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * (r + 20), cy + Math.sin(a) * (r + 20));
    ctx.lineTo(cx + Math.cos(a) * (r + 56), cy + Math.sin(a) * (r + 56));
    ctx.stroke();
  }
  ctx.restore();
}

export function diamond(
ctx: Ctx,
cx: number,
cy: number,
size: number,
color: string)
: void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = color;
  ctx.fillRect(-size / 2, -size / 2, size, size);
  ctx.restore();
}

export function starField(
ctx: Ctx,
w: number,
h: number,
count: number,
color: string,
seed = 42)
: void {
  const rand = seeded(seed);
  ctx.save();
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const x = rand() * w;
    const y = rand() * h * 0.7;
    const r = 1 + rand() * 2.6;
    ctx.globalAlpha = 0.35 + rand() * 0.65;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/** Stylised palm — trunk plus tapered fronds. */
export function palm(
ctx: Ctx,
x: number,
baseY: number,
h: number,
trunk: string,
frond: string,
lean = 1)
: void {
  const topY = baseY - h;
  ctx.save();
  ctx.lineCap = 'round';
  ctx.strokeStyle = trunk;
  ctx.lineWidth = Math.max(3, h * 0.05);
  ctx.beginPath();
  ctx.moveTo(x, baseY);
  ctx.quadraticCurveTo(x - lean * h * 0.14, baseY - h * 0.55, x, topY);
  ctx.stroke();

  const fr = h * 0.46;
  ctx.strokeStyle = frond;
  ctx.lineWidth = Math.max(2.5, h * 0.035);
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + (i - 3) * 0.46;
    const ex = x + Math.cos(a) * fr;
    const ey = topY + Math.sin(a) * fr + fr * 0.34;
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.quadraticCurveTo(
      x + Math.cos(a) * fr * 0.62,
      topY + Math.sin(a) * fr * 0.62 - fr * 0.18,
      ex,
      ey
    );
    ctx.stroke();
  }
  ctx.restore();
}

/** Small beach shack silhouette. */
export function shack(
ctx: Ctx,
x: number,
baseY: number,
w: number,
h: number,
body: string,
roof: string,
glow: string)
: void {
  ctx.save();
  ctx.fillStyle = body;
  ctx.fillRect(x, baseY - h, w, h);
  ctx.beginPath();
  ctx.moveTo(x - w * 0.14, baseY - h);
  ctx.lineTo(x + w / 2, baseY - h - h * 0.52);
  ctx.lineTo(x + w * 1.14, baseY - h);
  ctx.closePath();
  ctx.fillStyle = roof;
  ctx.fill();
  ctx.fillStyle = glow;
  ctx.fillRect(x + w * 0.2, baseY - h * 0.66, w * 0.2, h * 0.28);
  ctx.fillRect(x + w * 0.6, baseY - h * 0.66, w * 0.2, h * 0.28);
  ctx.restore();
}

function triangleAt(
ctx: Ctx,
cx: number,
cy: number,
angle: number,
radius: number,
size: number,
color: string,
pointOut: boolean)
: void {
  ctx.save();
  ctx.translate(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
  ctx.rotate(angle + Math.PI / 2 + (pointOut ? Math.PI : 0));
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.55);
  ctx.lineTo(size * 0.5, size * 0.45);
  ctx.lineTo(-size * 0.5, size * 0.45);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function rosette(ctx: Ctx, r: number, petal: string, core: string): void {
  ctx.fillStyle = petal;
  for (let p = 0; p < 8; p++) {
    const pa = p / 8 * Math.PI * 2;
    ctx.save();
    ctx.translate(Math.cos(pa) * r * 0.62, Math.sin(pa) * r * 0.62);
    ctx.rotate(pa);
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.5, r * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.24, 0, Math.PI * 2);
  ctx.fillStyle = core;
  ctx.fill();
}

/**
 * Goa block-print ring: green band, light rosettes, pink triangles.
 * Hand-built from primitives so it scales to any radius.
 */
export function ornamentRing(
ctx: Ctx,
cx: number,
cy: number,
rMid: number,
band: number,
count = 24)
: void {
  const rOuter = rMid + band / 2;
  const rInner = rMid - band / 2;
  annulus(ctx, cx, cy, rOuter, rInner, LEAF_DEEP);
  strokeCircle(ctx, cx, cy, rOuter - band * 0.06, '#7ED957', band * 0.1);
  strokeCircle(ctx, cx, cy, rInner + band * 0.06, '#7ED957', band * 0.1);

  for (let i = 0; i < count; i++) {
    const a = i / count * Math.PI * 2 - Math.PI / 2;
    ctx.save();
    ctx.translate(cx + Math.cos(a) * rMid, cy + Math.sin(a) * rMid);
    ctx.rotate(a);
    rosette(ctx, band * 0.34, LEAF, LEAF_DEEP);
    ctx.restore();

    const b = (i + 0.5) / count * Math.PI * 2 - Math.PI / 2;
    triangleAt(ctx, cx, cy, b, rOuter - band * 0.2, band * 0.3, PINK, true);
    triangleAt(ctx, cx, cy, b, rInner + band * 0.2, band * 0.3, PINK, false);
    ctx.save();
    ctx.translate(cx + Math.cos(b) * rMid, cy + Math.sin(b) * rMid);
    ctx.beginPath();
    ctx.arc(0, 0, band * 0.09, 0, Math.PI * 2);
    ctx.fillStyle = LEAF;
    ctx.fill();
    ctx.restore();
  }
}

/** Straight version of the block-print band, for card edges. */
export function ornamentStrip(
ctx: Ctx,
x: number,
y: number,
w: number,
h: number,
count?: number)
: void {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.fillStyle = LEAF_DEEP;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#7ED957';
  ctx.fillRect(x, y, w, h * 0.09);
  ctx.fillRect(x, y + h * 0.91, w, h * 0.09);

  const n = count ?? Math.max(6, Math.round(w / h));
  const step = w / n;
  for (let i = 0; i < n; i++) {
    const cx = x + step * (i + 0.5);
    ctx.save();
    ctx.translate(cx, y + h / 2);
    rosette(ctx, h * 0.36, LEAF, LEAF_DEEP);
    ctx.restore();

    const bx = x + step * (i + 1);
    ctx.fillStyle = PINK;
    ctx.beginPath();
    ctx.moveTo(bx, y + h * 0.16);
    ctx.lineTo(bx + h * 0.16, y + h * 0.16);
    ctx.lineTo(bx - h * 0.16, y + h * 0.16);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(bx - h * 0.18, y + h * 0.14);
    ctx.lineTo(bx + h * 0.18, y + h * 0.14);
    ctx.lineTo(bx, y + h * 0.42);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(bx - h * 0.18, y + h * 0.86);
    ctx.lineTo(bx + h * 0.18, y + h * 0.86);
    ctx.lineTo(bx, y + h * 0.58);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

export function barcode(
ctx: Ctx,
x: number,
y: number,
w: number,
h: number,
color: string,
seed: number)
: void {
  const rand = seeded(seed);
  ctx.save();
  ctx.fillStyle = color;
  let cursor = x;
  while (cursor < x + w - 2) {
    const bw = 2 + Math.round(rand() * 5);
    if (rand() > 0.32) ctx.fillRect(cursor, y, bw, h);
    cursor += bw + 2 + Math.round(rand() * 3);
  }
  ctx.restore();
}

export type MeterSpec = {
  x: number;
  y: number;
  w: number;
  label: string;
  value: number;
  labelColor: string;
  trackColor: string;
  fillColor: string;
  valueColor: string;
  labelSize?: number;
};

/** One BUILD-O-METER row: tracked label, rounded track, filled bar, percentage. */
export function meterRow(ctx: Ctx, spec: MeterSpec): void {
  const size = spec.labelSize ?? 17;
  ctx.textBaseline = 'middle';
  ctx.font = `${size}px ${MONO}`;
  ctx.fillStyle = spec.labelColor;
  trackedText(ctx, spec.label, spec.x, spec.y, 3, 'left');

  const pct = `${Math.round(spec.value)}%`;
  ctx.font = `${size - 2}px ${MONO}`;
  ctx.fillStyle = spec.valueColor;
  const pctW = trackedWidth(ctx, pct, 1);
  trackedText(ctx, pct, spec.x + spec.w, spec.y, 1, 'right');

  const barY = spec.y + size * 0.95;
  const barW = spec.w - pctW - 14;
  const barH = Math.max(9, size * 0.62);
  fillRoundRect(ctx, spec.x, barY, barW, barH, barH / 2, spec.trackColor);
  const fill = Math.max(barH, barW * Math.min(100, Math.max(0, spec.value)) / 100);
  fillRoundRect(ctx, spec.x, barY, fill, barH, barH / 2, spec.fillColor);
}

export type CheckSpec = {
  x: number;
  y: number;
  size: number;
  label: string;
  checked: boolean;
  boxColor: string;
  tickColor: string;
  labelColor: string;
  maxWidth: number;
};

/** One packing-list row with a hand-drawn tick. */
export function checkRow(ctx: Ctx, spec: CheckSpec): void {
  const s = spec.size;
  ctx.save();
  ctx.textBaseline = 'middle';
  strokeRoundRect(ctx, spec.x, spec.y - s / 2, s, s, 3, spec.boxColor, 2);
  if (spec.checked) {
    ctx.strokeStyle = spec.tickColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(spec.x + s * 0.22, spec.y);
    ctx.lineTo(spec.x + s * 0.44, spec.y + s * 0.24);
    ctx.lineTo(spec.x + s * 0.8, spec.y - s * 0.26);
    ctx.stroke();
  }
  fittedText(
    ctx,
    spec.label,
    spec.x + s + 14,
    spec.y + 1,
    spec.maxWidth - s - 14,
    s * 0.92,
    MONO,
    spec.labelColor,
    0.5,
    'left',
    12
  );
  ctx.restore();
}

/** Small pill with centred label — used for chips across every graphic. */
export function chip(
ctx: Ctx,
cx: number,
cy: number,
w: number,
h: number,
bg: string,
text: string,
color: string,
size: number,
family: string,
tracking = 3)
: void {
  fillRoundRect(ctx, cx - w / 2, cy - h / 2, w, h, h / 2, bg);
  ctx.textBaseline = 'middle';
  fittedText(
    ctx,
    text,
    cx,
    cy + 1,
    w - h * 0.9,
    size,
    family,
    color,
    tracking,
    'center',
    11
  );
}