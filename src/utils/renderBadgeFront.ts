import {
  DISPLAY,
  MONO,
  chip,
  drawCover,
  fittedText,
  fillRoundRect,
  hashString,
  ornamentStrip,
  risingSun,
  roundRect,
  seeded,
  starField,
  stripes } from
'./draw';
import { badgeId } from '../data/builderTitles';
import { getTheme } from '../data/frameThemes';
import type { FrameTheme, TrimKind } from '../data/frameThemes';
import type { GraphicOptions, Orientation } from '../types';

export const BADGE_LANDSCAPE = { w: 1200, h: 675 };
export const BADGE_PORTRAIT = { w: 900, h: 1350 };

export function badgeSize(orientation: Orientation): {w: number;h: number;} {
  return orientation === 'portrait' ? BADGE_PORTRAIT : BADGE_LANDSCAPE;
}

/** Shared backdrop + paper card for both sides of the ID. */
export function drawCardBase(
ctx: CanvasRenderingContext2D,
theme: FrameTheme,
w: number,
h: number,
pad: number)
: {x: number;y: number;w: number;h: number;} {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = theme.sky;
  ctx.fillRect(0, 0, w, h);
  stripes(ctx, w, h, theme.skyBand, 26, 10);
  if (theme.stars) starField(ctx, w, h, 40, theme.ink, 5);

  const card = { x: pad, y: pad, w: w - pad * 2, h: h - pad * 2 };
  roundRect(ctx, card.x, card.y, card.w, card.h, 30);
  ctx.fillStyle = theme.card.paper;
  ctx.fill();
  return card;
}

/** Trim line that echoes the chosen frame trim on the card edge. */
export function drawCardTrim(
ctx: CanvasRenderingContext2D,
theme: FrameTheme,
trim: TrimKind,
x: number,
y: number,
w: number,
h: number)
: void {
  if (trim === 'ornament') {
    ornamentStrip(ctx, x, y, w, h);
    return;
  }
  const cy = y + h / 2;
  if (trim === 'dotted') {
    ctx.save();
    ctx.setLineDash([5, 14]);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, cy);
    ctx.lineTo(x + w, cy);
    ctx.lineWidth = 8;
    ctx.strokeStyle = theme.card.headerBg;
    ctx.stroke();
    ctx.restore();
    return;
  }
  if (trim === 'rope') {
    ctx.fillStyle = theme.card.headerBg;
    ctx.fillRect(x, cy - 7, w, 4);
    ctx.fillRect(x, cy + 3, w, 4);
    return;
  }
  const rand = seeded(hashString(theme.id) + 11);
  ctx.save();
  ctx.strokeStyle = theme.card.headerBg;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  for (let i = 0; i < w; i += 22) {
    const len = 8 + rand() * 12;
    ctx.beginPath();
    ctx.moveTo(x + i, cy + h / 2 - 2);
    ctx.lineTo(x + i + 6, cy + h / 2 - 2 - len);
    ctx.stroke();
  }
  ctx.restore();
}

function photoWell(
ctx: CanvasRenderingContext2D,
theme: FrameTheme,
o: GraphicOptions,
x: number,
y: number,
w: number,
h: number)
: void {
  fillRoundRect(ctx, x + 14, y + 14, w, h, 22, theme.pop);
  ctx.save();
  roundRect(ctx, x, y, w, h, 22);
  ctx.clip();
  if (o.img) {
    drawCover(ctx, o.img, x, y, w, h, o.zoom, o.offset.x, o.offset.y);
  } else {
    ctx.fillStyle = theme.card.headerBg;
    ctx.fillRect(x, y, w, h);
    ctx.textBaseline = 'middle';
    fittedText(
      ctx,
      'DROP A PHOTO',
      x + w / 2,
      y + h / 2,
      w - 60,
      24,
      MONO,
      theme.card.paper,
      6,
      'center',
      12
    );
  }
  ctx.restore();
  roundRect(ctx, x, y, w, h, 22);
  ctx.lineWidth = 8;
  ctx.strokeStyle = theme.card.headerBg;
  ctx.stroke();
}

/** Front of the builder ID — landscape or portrait. */
export function renderBadgeFront(
ctx: CanvasRenderingContext2D,
o: GraphicOptions,
orientation: Orientation)
: void {
  const theme = getTheme(o.themeId);
  const c = theme.card;
  const id = badgeId(`${o.name}${o.role}${o.handle}`);
  const { w, h } = badgeSize(orientation);
  const portrait = orientation === 'portrait';
  const card = drawCardBase(ctx, theme, w, h, portrait ? 36 : 40);

  ctx.save();
  roundRect(ctx, card.x, card.y, card.w, card.h, 30);
  ctx.clip();

  risingSun(
    ctx,
    card.x + card.w - 150,
    card.y + card.h - (portrait ? 150 : 100),
    92,
    theme.orbGlow,
    theme.orbGlow
  );

  const headerH = portrait ? 112 : 86;
  ctx.fillStyle = c.headerBg;
  ctx.fillRect(card.x, card.y, card.w, headerH);
  ctx.textBaseline = 'middle';

  const footerH = 66;
  const footerY = card.y + card.h - footerH;
  ctx.fillStyle = c.footerBg;
  ctx.fillRect(card.x, footerY, card.w, footerH);

  const inner = { x: card.x + 40, w: card.w - 80 };

  if (portrait) {
    fittedText(
      ctx,
      'HACKER HOUSE GOA',
      card.x + card.w / 2,
      card.y + 44,
      inner.w,
      46,
      DISPLAY,
      c.headerInk,
      3,
      'center',
      22
    );
    fittedText(
      ctx,
      '28–31 OCT 2026 · GOA, INDIA',
      card.x + card.w / 2,
      card.y + 86,
      inner.w,
      19,
      MONO,
      c.headerMeta,
      3,
      'center',
      12
    );
  } else {
    fittedText(
      ctx,
      'HACKER HOUSE GOA',
      inner.x,
      card.y + 45,
      520,
      40,
      DISPLAY,
      c.headerInk,
      3,
      'left',
      20
    );
    fittedText(
      ctx,
      '28–31 OCT 2026 · GOA, INDIA',
      inner.x + inner.w,
      card.y + 45,
      420,
      20,
      MONO,
      c.headerMeta,
      3,
      'right',
      12
    );
  }

  fittedText(
    ctx,
    '#FRAMEINGOA',
    inner.x,
    footerY + 34,
    portrait ? 300 : 340,
    32,
    DISPLAY,
    c.footerInk,
    4,
    'left',
    18
  );
  fittedText(
    ctx,
    'HHGOA.COM',
    inner.x + inner.w,
    footerY + 34,
    260,
    20,
    MONO,
    c.footerInk,
    4,
    'right',
    12
  );

  const label = (text: string, x: number, y: number, maxW: number) =>
  fittedText(ctx, text, x, y, maxW, 18, MONO, c.label, 6, 'left', 11);

  if (portrait) {
    photoWell(ctx, theme, o, card.x + 58, card.y + 136, card.w - 130, 640);

    const cx = inner.x;
    const cw = inner.w;
    label('BUILDER', cx, card.y + 826, cw);
    fittedText(
      ctx,
      (o.name || 'YOUR NAME').toUpperCase(),
      cx,
      card.y + 882,
      cw,
      80,
      DISPLAY,
      c.ink,
      2,
      'left',
      26
    );
    ctx.fillStyle = c.rule;
    ctx.fillRect(cx, card.y + 922, cw, 3);

    label('STACK / ROLE', cx, card.y + 950, cw);
    fittedText(
      ctx,
      o.role || 'Full-stack · shipping things',
      cx,
      card.y + 984,
      cw,
      28,
      MONO,
      c.ink,
      1,
      'left',
      14
    );

    label('BUILDER CLASS', cx, card.y + 1022, cw);
    chip(
      ctx,
      cx + Math.min(cw, 520) / 2,
      card.y + 1072,
      Math.min(cw, 520),
      60,
      theme.accent,
      o.title || 'Midnight Shipper',
      theme.accentInk,
      34,
      DISPLAY,
      2
    );

    fittedText(
      ctx,
      o.handle ? `@${o.handle}` : 'goa.hackerhouse',
      cx,
      card.y + 1134,
      cw * 0.55,
      22,
      MONO,
      c.ink,
      2,
      'left',
      12
    );
    fittedText(
      ctx,
      id,
      cx + cw,
      card.y + 1134,
      cw * 0.4,
      20,
      MONO,
      c.inkSoft,
      3,
      'right',
      12
    );

    drawCardTrim(ctx, theme, o.trimId as TrimKind, card.x, footerY - 34, card.w, 28);
  } else {
    photoWell(ctx, theme, o, card.x + 36, card.y + 122, 322, 346);

    const rx = card.x + 36 + 322 + 62;
    const rw = card.x + card.w - 40 - rx;

    label('BUILDER', rx, card.y + 148, rw);
    fittedText(
      ctx,
      (o.name || 'YOUR NAME').toUpperCase(),
      rx,
      card.y + 202,
      rw,
      74,
      DISPLAY,
      c.ink,
      2,
      'left',
      26
    );
    ctx.fillStyle = c.rule;
    ctx.fillRect(rx, card.y + 240, rw, 3);

    label('STACK / ROLE', rx, card.y + 272, rw);
    fittedText(
      ctx,
      o.role || 'Full-stack · shipping things',
      rx,
      card.y + 306,
      rw,
      26,
      MONO,
      c.ink,
      1,
      'left',
      14
    );

    label('BUILDER CLASS', rx, card.y + 350, rw);
    chip(
      ctx,
      rx + Math.min(rw, 460) / 2,
      card.y + 400,
      Math.min(rw, 460),
      60,
      theme.accent,
      o.title || 'Midnight Shipper',
      theme.accentInk,
      32,
      DISPLAY,
      2
    );

    fittedText(
      ctx,
      o.handle ? `@${o.handle}` : 'goa.hackerhouse',
      rx,
      card.y + 462,
      rw * 0.55,
      22,
      MONO,
      c.ink,
      2,
      'left',
      12
    );
    fittedText(
      ctx,
      id,
      rx + rw,
      card.y + 462,
      rw * 0.4,
      20,
      MONO,
      c.inkSoft,
      3,
      'right',
      12
    );

    drawCardTrim(ctx, theme, o.trimId as TrimKind, card.x, footerY - 32, card.w, 26);
  }

  ctx.restore();

  // Outer keyline so the card reads as a card on every backdrop
  roundRect(ctx, card.x, card.y, card.w, card.h, 30);
  ctx.lineWidth = 4;
  ctx.strokeStyle = theme.ring;
  ctx.stroke();
}