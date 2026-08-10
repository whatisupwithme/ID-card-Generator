import {
  CREAM,
  DEEP,
  DISPLAY,
  GREEN,
  MONO,
  PINK,
  SAND,
  YELLOW,
  drawCover,
  fillRoundRect,
  fitFont,
  risingSun,
  roundRect,
  stripes,
  trackedText } from
'./draw';
import { badgeId } from '../data/builderTitles';
import type { GraphicOptions } from '../types';

export const BADGE_W = 1200;
export const BADGE_H = 675;

/** Landscape builder ID, sized for an X card so the post preview fills edge to edge. */
export function renderBadge(
ctx: CanvasRenderingContext2D,
o: GraphicOptions)
: void {
  ctx.clearRect(0, 0, BADGE_W, BADGE_H);
  ctx.fillStyle = DEEP;
  ctx.fillRect(0, 0, BADGE_W, BADGE_H);
  stripes(ctx, BADGE_W, BADGE_H, 'rgba(246,233,198,0.07)', 24, 8);

  const cardX = 40;
  const cardY = 40;
  const cardW = BADGE_W - 80;
  const cardH = BADGE_H - 80;

  ctx.save();
  roundRect(ctx, cardX, cardY, cardW, cardH, 30);
  ctx.fillStyle = CREAM;
  ctx.fill();
  ctx.clip();

  // Rising-sun watermark, lifted from the HH Goa beach artwork
  risingSun(
    ctx,
    cardX + cardW - 150,
    cardY + cardH - 66,
    96,
    'rgba(255,210,30,0.35)',
    'rgba(255,210,30,0.5)'
  );

  // Header bar
  ctx.fillStyle = GREEN;
  ctx.fillRect(cardX, cardY, cardW, 86);
  ctx.textBaseline = 'middle';
  ctx.fillStyle = CREAM;
  ctx.font = `40px ${DISPLAY}`;
  trackedText(ctx, 'HACKER HOUSE GOA', cardX + 36, cardY + 46, 3, 'left');
  ctx.fillStyle = YELLOW;
  ctx.font = `20px ${MONO}`;
  trackedText(ctx, '28–31 OCT 2026 · GOA, INDIA', cardX + cardW - 36, cardY + 46, 3, 'right');

  // Footer bar
  const footY = cardY + cardH - 66;
  ctx.fillStyle = PINK;
  ctx.fillRect(cardX, footY, cardW, 66);
  ctx.fillStyle = CREAM;
  ctx.font = `32px ${DISPLAY}`;
  trackedText(ctx, '#FRAMEINGOA', cardX + 36, footY + 34, 4, 'left');
  ctx.font = `20px ${MONO}`;
  trackedText(ctx, 'HHGOA.COM', cardX + cardW - 36, footY + 34, 4, 'right');

  // Photo panel
  const px = cardX + 36;
  const py = cardY + 122;
  const pw = 330;
  const ph = 386;
  fillRoundRect(ctx, px + 14, py + 14, pw, ph, 22, PINK);
  ctx.save();
  roundRect(ctx, px, py, pw, ph, 22);
  ctx.clip();
  if (o.img) {
    drawCover(ctx, o.img, px, py, pw, ph, o.zoom, o.offset.x, o.offset.y);
  } else {
    ctx.fillStyle = SAND;
    ctx.fillRect(px, py, pw, ph);
    ctx.fillStyle = 'rgba(11,74,47,0.55)';
    ctx.font = `24px ${MONO}`;
    trackedText(ctx, 'DROP A PHOTO', px + pw / 2, py + ph / 2, 6, 'center');
  }
  ctx.restore();
  roundRect(ctx, px, py, pw, ph, 22);
  ctx.lineWidth = 8;
  ctx.strokeStyle = GREEN;
  ctx.stroke();

  // Right column
  const rx = px + pw + 66;
  const rw = cardX + cardW - 36 - rx;

  const label = (text: string, y: number) => {
    ctx.fillStyle = PINK;
    ctx.font = `18px ${MONO}`;
    trackedText(ctx, text, rx, y, 6, 'left');
  };

  label('BUILDER', cardY + 146);
  const name = (o.name || 'YOUR NAME').toUpperCase();
  const nameSize = fitFont(ctx, name, rw, 76, DISPLAY, 2, 26);
  ctx.fillStyle = GREEN;
  ctx.font = `${nameSize}px ${DISPLAY}`;
  trackedText(ctx, name, rx, cardY + 200, 2, 'left');

  ctx.fillStyle = 'rgba(11,74,47,0.25)';
  ctx.fillRect(rx, cardY + 240, rw, 3);

  label('STACK / ROLE', cardY + 274);
  const role = o.role || 'Full-stack · shipping things';
  const roleSize = fitFont(ctx, role, rw, 26, MONO, 1, 14);
  ctx.fillStyle = GREEN;
  ctx.font = `${roleSize}px ${MONO}`;
  trackedText(ctx, role, rx, cardY + 308, 1, 'left');

  label('BUILDER CLASS', cardY + 356);
  const title = o.title || 'Midnight Shipper';
  ctx.font = `34px ${DISPLAY}`;
  const chipTextW = Math.min(
    ctx.measureText(title).width + title.length * 2,
    rw - 56
  );
  const chipW = chipTextW + 56;
  const chipY = cardY + 378;
  fillRoundRect(ctx, rx, chipY, chipW, 62, 31, YELLOW);
  const tSize = fitFont(ctx, title, chipW - 48, 34, DISPLAY, 2, 16);
  ctx.fillStyle = GREEN;
  ctx.font = `${tSize}px ${DISPLAY}`;
  trackedText(ctx, title, rx + chipW / 2, chipY + 33, 2, 'center');

  // Handle + id row
  ctx.fillStyle = GREEN;
  ctx.font = `22px ${MONO}`;
  trackedText(
    ctx,
    o.handle ? `@${o.handle}` : 'goa.hackerhouse',
    rx,
    cardY + 478,
    2,
    'left'
  );
  ctx.fillStyle = GREEN;
  ctx.font = `18px ${MONO}`;
  trackedText(
    ctx,
    badgeId(`${o.name}${o.role}${o.handle}`),
    cardX + cardW - 36,
    cardY + 478,
    3,
    'right'
  );

  ctx.restore();
}