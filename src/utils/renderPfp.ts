import {
  DISPLAY,
  MONO,
  annulus,
  chip,
  diamond,
  drawCover,
  fittedText,
  hashString,
  ornamentRing,
  palm,
  seeded,
  shack,
  starField,
  strokeArc,
  strokeCircle,
  stripes,
  sunburst,
  trackedText } from
'./draw';
import { badgeId } from '../data/builderTitles';
import { getTheme } from '../data/frameThemes';
import type { FrameTheme, TrimKind } from '../data/frameThemes';
import type { GraphicOptions } from '../types';

export const PFP_SIZE = 1024;

const CX = 512;
const CY = 512;
const DISC_R = 486;
const PHOTO_R = 300;
const TRIM_MID = 316;
const TRIM_BAND = 34;

function drawScene(ctx: CanvasRenderingContext2D, theme: FrameTheme): void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(CX, CY, DISC_R, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = theme.skyBand;
  ctx.fillRect(0, 0, PFP_SIZE, PFP_SIZE);

  if (theme.stars) {
    starField(ctx, PFP_SIZE, PFP_SIZE, 90, theme.ink, 9);
  } else {
    sunburst(ctx, CX, 300, 120, 470, 34, theme.orbGlow, 6);
  }

  // Sun / moon tucked into the upper-left ring so nothing hides it
  const orbX = 178;
  const orbY = 318;
  ctx.beginPath();
  ctx.arc(orbX, orbY, 74, 0, Math.PI * 2);
  ctx.fillStyle = theme.orbGlow;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(orbX, orbY, 52, 0, Math.PI * 2);
  ctx.fillStyle = theme.orb;
  ctx.fill();
  if (theme.stars) {
    ctx.fillStyle = theme.skyBand;
    ctx.globalAlpha = 0.35;
    [
    [-16, -12, 13],
    [12, 6, 9],
    [-4, 22, 7]].
    forEach(([dx, dy, r]) => {
      ctx.beginPath();
      ctx.arc(orbX + dx, orbY + dy, r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  // Sea + sand
  ctx.fillStyle = theme.sea;
  ctx.fillRect(0, 660, PFP_SIZE, 90);
  ctx.fillStyle = theme.sand;
  ctx.fillRect(0, 748, PFP_SIZE, PFP_SIZE - 748);

  // Shacks and palms in the visible lower ring
  shack(ctx, 96, 792, 96, 62, theme.sceneDeep, theme.scene, theme.accent);
  shack(ctx, 826, 800, 104, 66, theme.sceneDeep, theme.scene, theme.accent);
  palm(ctx, 168, 800, 240, theme.sceneDeep, theme.scene, 1);
  palm(ctx, 872, 812, 268, theme.sceneDeep, theme.scene, -1);
  palm(ctx, 258, 830, 150, theme.sceneDeep, theme.scene, 1);
  palm(ctx, 784, 836, 138, theme.sceneDeep, theme.scene, -1);

  // Footer band keeps the bottom line perfectly legible in every theme
  ctx.fillStyle = theme.disc;
  ctx.fillRect(0, 918, PFP_SIZE, PFP_SIZE - 918);
  ctx.fillStyle = theme.accent;
  ctx.fillRect(0, 914, PFP_SIZE, 4);

  ctx.restore();
}

function drawTrim(
ctx: CanvasRenderingContext2D,
theme: FrameTheme,
trim: TrimKind)
: void {
  if (trim === 'ornament') {
    ornamentRing(ctx, CX, CY, TRIM_MID, TRIM_BAND, 26);
    return;
  }

  annulus(
    ctx,
    CX,
    CY,
    TRIM_MID + TRIM_BAND / 2,
    TRIM_MID - TRIM_BAND / 2,
    theme.disc
  );

  if (trim === 'dotted') {
    ctx.save();
    ctx.setLineDash([6, 22]);
    ctx.lineCap = 'round';
    strokeArc(ctx, CX, CY, TRIM_MID, 0, Math.PI * 2, theme.accent, 12);
    ctx.restore();
    strokeCircle(ctx, CX, CY, TRIM_MID + TRIM_BAND / 2 - 3, theme.pop, 4);
  }

  if (trim === 'rope') {
    strokeCircle(ctx, CX, CY, TRIM_MID + 11, theme.accent, 7);
    strokeCircle(ctx, CX, CY, TRIM_MID - 12, theme.pop, 5);
    sunburst(ctx, CX, CY, TRIM_MID - 6, TRIM_MID + 6, 64, theme.accent, 3);
  }

  if (trim === 'rays') {
    sunburst(
      ctx,
      CX,
      CY,
      PHOTO_R + 4,
      TRIM_MID + TRIM_BAND / 2,
      52,
      theme.accent,
      5
    );
    strokeCircle(ctx, CX, CY, PHOTO_R + 3, theme.pop, 5);
  }
}

/**
 * Square profile frame: themed beach scene, a trimmed photo disc and
 * brand chips. Everything sits inside the circle X crops PFPs to.
 */
export function renderPfp(
ctx: CanvasRenderingContext2D,
o: GraphicOptions)
: void {
  const theme = getTheme(o.themeId);
  const id = badgeId(`${o.name}${o.role}${o.handle}`);

  ctx.clearRect(0, 0, PFP_SIZE, PFP_SIZE);
  ctx.fillStyle = theme.sky;
  ctx.fillRect(0, 0, PFP_SIZE, PFP_SIZE);
  stripes(ctx, PFP_SIZE, PFP_SIZE, theme.orbGlow, 28, 8);

  drawScene(ctx, theme);
  strokeCircle(ctx, CX, CY, DISC_R - 6, theme.ring, 8);
  strokeCircle(ctx, CX, CY, DISC_R - 26, theme.ring, 2);

  // Photo well
  ctx.save();
  ctx.beginPath();
  ctx.arc(CX, CY, PHOTO_R, 0, Math.PI * 2);
  ctx.clip();
  if (o.img) {
    drawCover(
      ctx,
      o.img,
      CX - PHOTO_R,
      CY - PHOTO_R,
      PHOTO_R * 2,
      PHOTO_R * 2,
      o.zoom,
      o.offset.x,
      o.offset.y
    );
  } else {
    ctx.fillStyle = theme.disc;
    ctx.fillRect(CX - PHOTO_R, CY - PHOTO_R, PHOTO_R * 2, PHOTO_R * 2);
    const rand = seeded(hashString(theme.id) + 3);
    ctx.fillStyle = theme.inkSoft;
    for (let i = 0; i < 3; i++) {
      ctx.globalAlpha = 0.12 + rand() * 0.08;
      ctx.beginPath();
      ctx.arc(CX, CY + 40 + i * 30, 210 - i * 40, Math.PI, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.textBaseline = 'middle';
    ctx.font = `30px ${MONO}`;
    ctx.fillStyle = theme.ink;
    trackedText(ctx, 'DROP A PHOTO', CX, CY, 8, 'center');
  }
  ctx.restore();

  drawTrim(ctx, theme, o.trimId as TrimKind);

  diamond(ctx, CX - 300, CY - 300, 20, theme.accent);
  diamond(ctx, CX + 300, CY - 300, 20, theme.accent);
  diamond(ctx, CX - 300, CY + 300, 20, theme.pop);
  diamond(ctx, CX + 300, CY + 300, 20, theme.pop);

  // Top lockup
  ctx.textBaseline = 'middle';
  fittedText(
    ctx,
    'HACKER HOUSE',
    CX,
    96,
    520,
    52,
    DISPLAY,
    theme.ink,
    4,
    'center',
    24
  );
  chip(
    ctx,
    CX,
    154,
    430,
    48,
    theme.pop,
    'GOA · 28–31 OCT 2026',
    theme.popInk,
    21,
    MONO,
    3
  );

  // Bottom builder chip
  chip(
    ctx,
    CX,
    886,
    440,
    70,
    theme.accent,
    `BUILDER ${id}`,
    theme.accentInk,
    30,
    DISPLAY,
    3
  );

  const band = o.handle ? `@${o.handle} · #FRAMEINGOA` : '#FRAMEINGOA';
  fittedText(ctx, band, CX, 958, 372, 22, MONO, theme.bandInk, 2, 'center', 12);
}