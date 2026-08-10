import {
  DISPLAY,
  MONO,
  barcode,
  checkRow,
  fillRoundRect,
  fittedText,
  hashString,
  meterRow,
  risingSun,
  roundRect } from
'./draw';
import { badgeId } from '../data/builderTitles';
import { getTheme } from '../data/frameThemes';
import type { FrameTheme, TrimKind } from '../data/frameThemes';
import { meterLabels, meterOrder, packingList } from '../data/manifest';
import { badgeSize, drawCardBase, drawCardTrim } from './renderBadgeFront';
import type { GraphicOptions, Orientation } from '../types';

type Ctx = CanvasRenderingContext2D;

function sloganPanel(
ctx: Ctx,
theme: FrameTheme,
o: GraphicOptions,
x: number,
y: number,
w: number,
h: number)
: void {
  const c = theme.card;
  fillRoundRect(ctx, x, y, w, h, 18, c.panelBg);
  ctx.textBaseline = 'middle';
  fittedText(
    ctx,
    o.manifest.slogan,
    x + w / 2,
    y + h * 0.36,
    w - 48,
    36,
    DISPLAY,
    c.panelInk,
    2,
    'center',
    18
  );
  fittedText(
    ctx,
    o.manifest.sloganAccent,
    x + w / 2,
    y + h * 0.72,
    w - 48,
    28,
    DISPLAY,
    c.panelAccent,
    2,
    'center',
    14
  );
}

function meters(
ctx: Ctx,
theme: FrameTheme,
o: GraphicOptions,
x: number,
y: number,
w: number,
step: number,
labelSize: number)
: void {
  const c = theme.card;
  meterOrder.forEach((key, i) => {
    meterRow(ctx, {
      x,
      y: y + i * step,
      w,
      label: meterLabels[key],
      value: o.manifest.meters[key],
      labelColor: c.ink,
      trackColor: c.meterTrack,
      fillColor: i % 2 === 0 ? c.footerBg : theme.accent,
      valueColor: c.label,
      labelSize
    });
  });
}

function packed(
ctx: Ctx,
theme: FrameTheme,
o: GraphicOptions,
x: number,
y: number,
w: number,
step: number,
size: number)
: void {
  const c = theme.card;
  packingList.forEach((item, i) => {
    checkRow(ctx, {
      x,
      y: y + i * step,
      size,
      label: item.label,
      checked: Boolean(o.manifest.packed[item.id]),
      boxColor: c.inkSoft,
      tickColor: c.footerBg,
      labelColor: c.ink,
      maxWidth: w
    });
  });
}

/**
 * Back of the badge — the BUILDER MANIFEST: superpower, live status,
 * build-o-meter, packing list, barcode and the if-found strip.
 */
export function renderBadgeBack(
ctx: Ctx,
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
  ctx.textBaseline = 'middle';

  const headerH = portrait ? 92 : 78;
  ctx.fillStyle = c.headerBg;
  ctx.fillRect(card.x, card.y, card.w, headerH);

  const footerH = portrait ? 62 : 58;
  const footerY = card.y + card.h - footerH;
  ctx.fillStyle = c.footerBg;
  ctx.fillRect(card.x, footerY, card.w, footerH);

  const ix = card.x + 36;
  const iw = card.w - 72;
  const meta = `BACK OF BADGE · ${id.replace('-', ' ')}`;

  if (portrait) {
    fittedText(
      ctx,
      'BUILDER MANIFEST',
      ix,
      card.y + 36,
      iw,
      42,
      DISPLAY,
      c.headerInk,
      3,
      'left',
      20
    );
    fittedText(ctx, meta, ix, card.y + 70, iw, 17, MONO, c.headerMeta, 3, 'left', 11);
  } else {
    fittedText(
      ctx,
      'BUILDER MANIFEST',
      ix,
      card.y + 40,
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
      meta,
      ix + iw,
      card.y + 40,
      420,
      18,
      MONO,
      c.headerMeta,
      3,
      'right',
      11
    );
  }

  fittedText(
    ctx,
    'IF FOUND: RETURN TO HACKER HOUSE, GOA',
    portrait ? card.x + card.w / 2 : ix,
    footerY + footerH / 2,
    portrait ? iw : card.w * 0.6,
    portrait ? 19 : 20,
    MONO,
    c.footerInk,
    3,
    portrait ? 'center' : 'left',
    11
  );
  if (!portrait) {
    fittedText(
      ctx,
      '#FRAMEINGOA',
      ix + iw,
      footerY + footerH / 2,
      300,
      30,
      DISPLAY,
      c.footerInk,
      4,
      'right',
      16
    );
  }

  const label = (text: string, x: number, y: number, maxW: number) =>
  fittedText(ctx, text, x, y, maxW, 17, MONO, c.label, 6, 'left', 11);

  if (portrait) {
    label('SUPERPOWER', ix, card.y + 132, iw);
    fittedText(
      ctx,
      o.manifest.superpower,
      ix,
      card.y + 178,
      iw,
      44,
      DISPLAY,
      c.ink,
      1,
      'left',
      20
    );

    label('CURRENT STATUS', ix, card.y + 234, iw);
    fittedText(
      ctx,
      o.manifest.status,
      ix,
      card.y + 272,
      iw,
      26,
      MONO,
      c.ink,
      1,
      'left',
      13
    );

    ctx.fillStyle = c.rule;
    ctx.fillRect(ix, card.y + 302, iw, 3);

    sloganPanel(ctx, theme, o, ix, card.y + 328, iw, 138);

    label('BUILD-O-METER', ix, card.y + 500, iw);
    meters(ctx, theme, o, ix, card.y + 542, iw, 58, 20);

    label('PACKED FOR GOA', ix, card.y + 782, iw);
    packed(ctx, theme, o, ix, card.y + 828, iw, 50, 30);

    risingSun(
      ctx,
      card.x + card.w - 150,
      card.y + 1080,
      82,
      theme.orbGlow,
      theme.orbGlow
    );

    barcode(ctx, ix, card.y + 1024, 400, 62, c.ink, hashString(id));
    fittedText(
      ctx,
      'goa.hackerhouse',
      ix + 416,
      card.y + 1056,
      iw - 416,
      20,
      MONO,
      c.ink,
      1,
      'left',
      12
    );

    fittedText(
      ctx,
      '#FRAMEINGOA',
      card.x + card.w / 2,
      card.y + 1120,
      iw,
      38,
      DISPLAY,
      c.ink,
      4,
      'center',
      18
    );

    drawCardTrim(
      ctx,
      theme,
      o.trimId as TrimKind,
      card.x,
      footerY - 34,
      card.w,
      28
    );
  } else {
    const lx = ix;
    const lw = 520;

    label('SUPERPOWER', lx, card.y + 122, lw);
    fittedText(
      ctx,
      o.manifest.superpower,
      lx,
      card.y + 164,
      lw,
      38,
      DISPLAY,
      c.ink,
      1,
      'left',
      18
    );

    label('CURRENT STATUS', lx, card.y + 214, lw);
    fittedText(
      ctx,
      o.manifest.status,
      lx,
      card.y + 248,
      lw,
      23,
      MONO,
      c.ink,
      1,
      'left',
      12
    );

    ctx.fillStyle = c.rule;
    ctx.fillRect(lx, card.y + 274, lw, 3);

    label('BUILD-O-METER', lx, card.y + 304, lw);
    meters(ctx, theme, o, lx, card.y + 336, lw, 42, 17);

    const rx = card.x + 596;
    const rw = card.x + card.w - 36 - rx;

    sloganPanel(ctx, theme, o, rx, card.y + 100, rw, 116);

    label('PACKED FOR GOA', rx, card.y + 250, rw);
    packed(ctx, theme, o, rx, card.y + 290, rw, 42, 26);

    risingSun(
      ctx,
      card.x + card.w - 140,
      card.y + 500,
      74,
      theme.orbGlow,
      theme.orbGlow
    );

    barcode(ctx, rx, card.y + 442, 288, 54, c.ink, hashString(id));
    fittedText(
      ctx,
      'goa.hackerhouse',
      rx + 302,
      card.y + 470,
      rw - 302,
      18,
      MONO,
      c.ink,
      1,
      'left',
      11
    );

    drawCardTrim(
      ctx,
      theme,
      o.trimId as TrimKind,
      card.x,
      footerY - 30,
      card.w,
      24
    );
  }

  ctx.restore();

  roundRect(ctx, card.x, card.y, card.w, card.h, 30);
  ctx.lineWidth = 4;
  ctx.strokeStyle = theme.ring;
  ctx.stroke();
}