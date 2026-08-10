export const GREEN = '#0B4A2F';
export const DEEP = '#063521';
export const CREAM = '#F6E9C6';
export const SAND = '#E4D6AE';
export const YELLOW = '#FFD21E';
export const PINK = '#F0186B';

export const DISPLAY = 'Anton, sans-serif';
export const MONO = '"IBM Plex Mono", ui-monospace, monospace';

type Ctx = CanvasRenderingContext2D;

export function roundRect(
ctx: Ctx,
x: number,
y: number,
w: number,
h: number,
r: number)
: void {
  const radius = Math.min(r, w / 2, h / 2);
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

export function trackedWidth(
ctx: Ctx,
text: string,
tracking: number)
: number {
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
    size -= 2;
    ctx.font = `${size}px ${family}`;
  }
  return size;
}

/** Straight rays radiating from a point — the HH Goa sunburst motif. */
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
    ctx.moveTo(cx + Math.cos(a) * (r + 22), cy + Math.sin(a) * (r + 22));
    ctx.lineTo(cx + Math.cos(a) * (r + 62), cy + Math.sin(a) * (r + 62));
    ctx.stroke();
  }
  ctx.restore();
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