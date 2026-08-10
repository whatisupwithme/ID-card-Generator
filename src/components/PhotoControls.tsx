import React, { useRef } from 'react';
import {
  ImagePlusIcon,
  LoaderCircleIcon,
  RefreshCwIcon } from
'lucide-react';
import { SectionLabel } from './ui/SectionLabel';

type Props = {
  hasImage: boolean;
  zoom: number;
  loading: boolean;
  onFile: (file: File) => void;
  onZoomChange: (zoom: number) => void;
  onReset: () => void;
};

export function PhotoControls({
  hasImage,
  zoom,
  loading,
  onFile,
  onZoomChange,
  onReset
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-3">
      <div>
        <SectionLabel>PHOTO</SectionLabel>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) onFile(file);
          }}
          className="mt-2 rounded-2xl border-2 border-dashed border-line p-2.5 text-center">
          
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pop px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-popInk transition hover:brightness-110">
            
            {loading ?
            <LoaderCircleIcon
              className="h-4 w-4 animate-spin"
              aria-hidden="true" /> :


            <ImagePlusIcon className="h-4 w-4" aria-hidden="true" />
            }
            {hasImage ? 'REPLACE PHOTO' : 'UPLOAD PHOTO'}
          </button>
          <p className="mt-2 font-mono text-[10px] leading-relaxed text-inkSoft">
            JPG · PNG · WEBP · HEIC — or drop a file here.
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.heic,.heif"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFile(file);
              e.target.value = '';
            }} />
          
        </div>
      </div>

      <div>
        <SectionLabel as="label" htmlFor="zoom">
          ZOOM
        </SectionLabel>
        <div className="mt-2 flex items-center gap-2">
          <input
            id="zoom"
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            disabled={!hasImage}
            onChange={(e) => onZoomChange(Number(e.target.value))}
            className="goa-range disabled:opacity-40" />
          
          <button
            type="button"
            onClick={onReset}
            className="shrink-0 rounded-full border border-line p-2 text-ink transition hover:border-accent"
            aria-label="Re-centre photo">
            
            <RefreshCwIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>);

}