import React, { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  MonitorIcon,
  RepeatIcon,
  SmartphoneIcon,
  SparklesIcon } from
'lucide-react';
import { graphicSize, paintCanvas } from '../utils/render';
import type {
  Format,
  GraphicOptions,
  Offset,
  Orientation,
  Side } from
'../types';

type Props = {
  format: Format;
  orientation: Orientation;
  side: Side;
  options: GraphicOptions;
  themeLabel: string;
  frontRef: React.RefObject<HTMLCanvasElement>;
  backRef: React.RefObject<HTMLCanvasElement>;
  onOffsetChange: (offset: Offset) => void;
  onSideChange: (side: Side) => void;
  onOrientationChange: (orientation: Orientation) => void;
};

const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));

export function PreviewStage({
  format,
  orientation,
  side,
  options,
  themeLabel,
  frontRef,
  backRef,
  onOffsetChange,
  onSideChange,
  onOrientationChange
}: Props) {
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origin: Offset;
    width: number;
    height: number;
  } | null>(null);

  const isCard = format === 'id';
  const size = graphicSize(format, orientation);

  const draw = useCallback(() => {
    if (frontRef.current) {
      paintCanvas(frontRef.current, {
        format,
        orientation,
        side: 'front',
        options
      });
    }
    if (isCard && backRef.current) {
      paintCanvas(backRef.current, {
        format,
        orientation,
        side: 'back',
        options
      });
    }
  }, [backRef, format, frontRef, isCard, options, orientation]);

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

  const grab = options.img ?
  'cursor-grab touch-none active:cursor-grabbing' :
  '';

  return (
    <section
      aria-label="Preview"
      className="flex w-full flex-col rounded-3xl border border-line bg-panel p-3 sm:p-4 lg:min-h-0">
      
      <div className="flip-scene flex items-center justify-center lg:min-h-0 lg:flex-1">
        <motion.div
          className="flip-card relative max-w-full"
          animate={{ rotateY: isCard && side === 'back' ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 110, damping: 17 }}
          onDoubleClick={() =>
          isCard && onSideChange(side === 'front' ? 'back' : 'front')
          }>
          
          <canvas
            ref={frontRef}
            role="img"
            aria-label={
            format === 'pfp' ?
            'Preview of your Hacker House Goa 2026 profile frame' :
            'Front of your Hacker House Goa 2026 builder ID'
            }
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`flip-face block max-h-[54vh] max-w-full rounded-2xl lg:max-h-[min(52vh,540px)] ${grab}`} />
          
          {isCard ?
          <canvas
            ref={backRef}
            role="img"
            aria-label="Back of your builder ID — the builder manifest"
            aria-hidden={side === 'front'}
            className="flip-face absolute inset-0 h-full w-full rounded-2xl"
            style={{ transform: 'rotateY(180deg)' }} /> :

          null}
        </motion.div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-panelAlt px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-inkSoft">
            {size.w} × {size.h} PNG
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-panelAlt px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-inkSoft">
            <SparklesIcon className="h-3 w-3 text-pop" aria-hidden="true" />
            {themeLabel}
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.16em] text-inkSoft sm:inline">
            {options.img ?
            'DRAG TO REPOSITION' :
            'ADD A PHOTO TO GET STARTED'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {isCard ?
          <>
              <button
              type="button"
              onClick={() =>
              onOrientationChange(
                orientation === 'landscape' ? 'portrait' : 'landscape'
              )
              }
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-[0.16em] text-ink transition hover:border-accent">
              
                {orientation === 'landscape' ?
              <MonitorIcon className="h-3.5 w-3.5" aria-hidden="true" /> :

              <SmartphoneIcon className="h-3.5 w-3.5" aria-hidden="true" />
              }
                {orientation === 'landscape' ? 'LANDSCAPE' : 'PORTRAIT'}
              </button>
              <button
              type="button"
              onClick={() => onSideChange(side === 'front' ? 'back' : 'front')}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.16em] text-accentInk transition hover:brightness-105">
              
                <RepeatIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {side === 'front' ? 'FLIP TO MANIFEST' : 'FLIP TO FRONT'}
              </button>
            </> :

          <span className="font-mono text-[10px] tracking-[0.16em] text-inkSoft">
              SQUARE · SAFE FOR X CROP
            </span>
          }
        </div>
      </div>
    </section>);

}