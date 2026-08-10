import {
  CREAM,
  DISPLAY,
  GREEN,
  MONO,
  PINK,
  SAND,
  YELLOW,
  diamond,
  drawCover,
  fillRoundRect,
  fitFont,
  strokeArc,
  strokeCircle,
  sunburst,
  trackedText } from
'./draw';
import type { GraphicOptions } from '../types';

export const PFP_SIZE = 1024;

/**
 * Sticker-style profile frame: photo disc, green ring with dotted trim,
 * overlapping brand chips top and bottom. Everything stays inside the
 * circle X crops profile pictures to.
 */
export function renderPfp(
ctx: CanvasRenderingContext2D,
o: GraphicOptions)
: void {
  const S = PFP_SIZE;
  const cx = S / 2;
  const cy = S / 2;

  ctx.clearRect(0, 0, S, S);
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, S, S);
  // Sunburst rays behind the disc, echoing the HH Goa beach artwork
  sunburst(ctx, cx, cy, 502, 780, 40, 'rgba(11,74,47,0.16)', 7);

  // Outer disc
  ctx.beginPath();
  ctx.arc(cx, cy, 486, 0, Math.PI * 2);
  ctx.fillStyle = GREEN;
  ctx.fill();
  strokeCircle(ctx, cx, cy, 480, YELLOW, 5);

  // Photo well
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 392, 0, Math.PI * 2);
  ctx.clip();
  if (o.img) {
    drawCover(ctx, o.img, cx - 392, cy - 392, 784, 784, o.zoom, o.offset.x, o.offset.y);
  } else {
    ctx.fillStyle = SAND;
    ctx.fillRect(cx - 392, cy - 392, 784, 784);
    ctx.fillStyle = 'rgba(11,74,47,0.55)';
    ctx.font = `30px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    trackedText(ctx, 'DROP A PHOTO', cx, cy, 8, 'center');
  }
  ctx.restore();

  strokeCircle(ctx, cx, cy, 396, PINK, 9);

  // Dotted trim in the ring — broken at the bottom so it never runs into the date line
  ctx.save();
  ctx.setLineDash([5, 20]);
  ctx.lineCap = 'round';
  strokeArc(
    ctx,
    cx,
    cy,
    436,
    Math.PI / 2 + 0.66,
    Math.PI * 2.5 - 0.66,
    'rgba(246,233,198,0.6)',
    6
  );
  ctx.restore();

  diamond(ctx, cx - 306, cy - 306, 22, YELLOW);
  diamond(ctx, cx + 306, cy - 306, 22, YELLOW);
  diamond(ctx, cx - 306, cy + 306, 22, PINK);
  diamond(ctx, cx + 306, cy + 306, 22, PINK);

  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  // Top chip
  const topW = 420;
  const topH = 88;
  fillRoundRect(ctx, cx - topW / 2, 94, topW, topH, topH / 2, PINK);
  ctx.fillStyle = CREAM;
  ctx.font = `40px ${DISPLAY}`;
  trackedText(ctx, '#FRAMEINGOA', cx, 94 + topH / 2 + 3, 4, 'center');

  // Bottom chip
  const label = 'HACKER HOUSE GOA';
  const botW = 484;
  const botH = 96;
  const botY = 806;
  fillRoundRect(ctx, cx - botW / 2, botY, botW, botH, botH / 2, YELLOW);
  ctx.fillStyle = GREEN;
  const size = fitFont(ctx, label, botW - 56, 46, DISPLAY, 3);
  ctx.font = `${size}px ${DISPLAY}`;
  trackedText(ctx, label, cx, botY + botH / 2 + 3, 3, 'center');

  // Footer line — kept well inside the circle X crops to
  const footer = o.handle ?
  `@${o.handle} · 28–31 OCT 2026` :
  '28–31 OCT 2026 · GOA';
  ctx.fillStyle = CREAM;
  const fSize = fitFont(ctx, footer, 360, 22, MONO, 2, 13);
  ctx.font = `${fSize}px ${MONO}`;
  trackedText(ctx, footer, cx, 948, 2, 'center');
}