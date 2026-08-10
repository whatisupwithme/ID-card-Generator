import { PFP_SIZE, renderPfp } from './renderPfp';
import { badgeSize, renderBadgeFront } from './renderBadgeFront';
import { renderBadgeBack } from './renderBadgeBack';
import type { Format, GraphicOptions, Orientation, Side } from '../types';

export type GraphicSpec = {
  format: Format;
  orientation: Orientation;
  side: Side;
  options: GraphicOptions;
};

export function graphicSize(
format: Format,
orientation: Orientation)
: {w: number;h: number;} {
  if (format === 'pfp') return { w: PFP_SIZE, h: PFP_SIZE };
  return badgeSize(orientation);
}

/** Sizes the canvas for the current graphic and paints it. */
export function paintCanvas(
canvas: HTMLCanvasElement,
spec: GraphicSpec)
: void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { w, h } = graphicSize(spec.format, spec.orientation);
  canvas.width = w;
  canvas.height = h;
  ctx.clearRect(0, 0, w, h);

  if (spec.format === 'pfp') {
    renderPfp(ctx, spec.options);
    return;
  }
  if (spec.side === 'back') {
    renderBadgeBack(ctx, spec.options, spec.orientation);
    return;
  }
  renderBadgeFront(ctx, spec.options, spec.orientation);
}

export function graphicFileName(spec: GraphicSpec): string {
  if (spec.format === 'pfp') return 'hh-goa-2026-pfp.png';
  return `hh-goa-2026-builder-id-${spec.orientation}-${spec.side}.png`;
}