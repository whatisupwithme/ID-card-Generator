import React, { useCallback, useEffect, useRef } from 'react';
import type { Format, GraphicOptions, Offset } from '../types';
import { PFP_SIZE, renderPfp } from '../utils/renderPfp';
import { BADGE_H, BADGE_W, renderBadge } from '../utils/renderBadge';

type Props = {
  format: Format;
  options: GraphicOptions;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onOffsetChange: (offset: Offset) => void;
};

const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));

export function PreviewStage({
  format,
  options,
  canvasRef,
  onOffsetChange
}: Props) {
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origin: Offset;
    width: number;
    height: number;
  } | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (format === 'pfp') {
      canvas.width = PFP_SIZE;
      canvas.height = PFP_SIZE;
      renderPfp(ctx, options);
    } else {
      canvas.width = BADGE_W;
      canvas.height = BADGE_H;
      renderBadge(ctx, options);
    }
  }, [canvasRef, format, options]);

  useEffect(() => {
    draw();
    let cancelled = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) draw();
      });
    }
    return () => {
      cancelled = true;
    };
  }, [draw]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!options.img) return;
    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origin: options.offset,
      width: rect.width,
      height: rect.height
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    onOffsetChange({
      x: clamp(drag.origin.x + (e.clientX - drag.startX) / drag.width),
      y: clamp(drag.origin.y + (e.clientY - drag.startY) / drag.height)
    });
  };

  const endDrag = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragRef.current) {
      dragRef.current = null;
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-3xl border border-goa-cream/15 bg-goa-green/60 p-3 sm:p-5">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={
          format === 'pfp' ?
          'Preview of your Hacker House Goa 2026 profile picture' :
          'Preview of your Hacker House Goa 2026 builder ID card'
          }
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={`block h-auto w-full rounded-2xl ${
          options.img ? 'cursor-grab active:cursor-grabbing touch-none' : ''}`
          } />
        
      </div>
      <p className="mt-3 text-center font-mono text-[11px] tracking-[0.15em] text-goa-cream/50">
        {options.img ?
        'DRAG THE PREVIEW TO REPOSITION YOUR PHOTO' :
        'PREVIEW UPDATES INSTANTLY AS YOU TYPE'}
      </p>
    </div>);

}