import React, { useRef } from 'react';
import {
  DownloadIcon,
  ImagePlusIcon,
  LoaderCircleIcon,
  RefreshCwIcon,
  ShuffleIcon } from
'lucide-react';
import type { Format, GraphicOptions } from '../types';

type Props = {
  format: Format;
  onFormatChange: (format: Format) => void;
  options: GraphicOptions;
  onOptionsChange: (patch: Partial<GraphicOptions>) => void;
  onFile: (file: File) => void;
  onReset: () => void;
  onShuffleTitle: () => void;
  onDownload: () => void;
  onShare: () => void;
  loading: boolean;
  error: string | null;
  status: string | null;
};

const labelClass =
'block font-mono text-[11px] tracking-[0.28em] text-goa-yellow';
const inputClass =
'mt-2 w-full rounded-xl border border-goa-cream/20 bg-goa-deep/70 px-4 py-3 font-mono text-sm text-goa-cream placeholder:text-goa-cream/35 outline-none transition focus:border-goa-yellow focus:ring-2 focus:ring-goa-yellow/30';

export function ControlsPanel({
  format,
  onFormatChange,
  options,
  onOptionsChange,
  onFile,
  onReset,
  onShuffleTitle,
  onDownload,
  onShare,
  loading,
  error,
  status
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div className="rounded-3xl border border-goa-cream/15 bg-goa-green/60 p-5 sm:p-6">
      <fieldset>
        <legend className={labelClass}>FORMAT</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(
          [
          ['pfp', 'PFP FRAME'],
          ['id', 'BUILDER ID']] as
          [Format, string][]).
          map(([value, text]) =>
          <button
            key={value}
            type="button"
            aria-pressed={format === value}
            onClick={() => onFormatChange(value)}
            className={`rounded-full px-4 py-3 font-mono text-xs tracking-[0.18em] transition ${
            format === value ?
            'bg-goa-yellow text-goa-ink' :
            'border border-goa-cream/25 text-goa-cream/80 hover:border-goa-yellow hover:text-goa-cream'}`
            }>
            
              {text}
            </button>
          )}
        </div>
      </fieldset>

      <div className="mt-6">
        <span className={labelClass}>PHOTO</span>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="mt-3 rounded-2xl border-2 border-dashed border-goa-cream/25 p-4 text-center">
          
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-goa-pink px-5 py-3 font-mono text-xs tracking-[0.2em] text-goa-cream transition hover:brightness-110">
            
            {loading ?
            <LoaderCircleIcon className="h-4 w-4 animate-spin" aria-hidden /> :

            <ImagePlusIcon className="h-4 w-4" aria-hidden />
            }
            {options.img ? 'REPLACE PHOTO' : 'UPLOAD PHOTO'}
          </button>
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-goa-cream/55">
            JPG · PNG · WEBP · HEIC. Any crop works — drag the preview to
            reframe.
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

      <div className="mt-6">
        <label className={labelClass} htmlFor="zoom">
          ZOOM
        </label>
        <div className="mt-3 flex items-center gap-3">
          <input
            id="zoom"
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={options.zoom}
            disabled={!options.img}
            onChange={(e) =>
            onOptionsChange({ zoom: Number(e.target.value) })
            }
            className="goa-range w-full disabled:opacity-40" />
          
          <button
            type="button"
            onClick={onReset}
            className="shrink-0 rounded-full border border-goa-cream/25 p-2 text-goa-cream/80 transition hover:border-goa-yellow hover:text-goa-cream"
            aria-label="Re-centre photo">
            
            <RefreshCwIcon className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      {format === 'id' ?
      <div className="mt-6 space-y-4">
          <div>
            <label className={labelClass} htmlFor="name">
              NAME
            </label>
            <input
            id="name"
            className={inputClass}
            value={options.name}
            maxLength={28}
            placeholder="Aarav Mehta"
            onChange={(e) => onOptionsChange({ name: e.target.value })} />
          
          </div>
          <div>
            <label className={labelClass} htmlFor="role">
              STACK / ROLE
            </label>
            <input
            id="role"
            className={inputClass}
            value={options.role}
            maxLength={42}
            placeholder="Next.js · Rust · infra"
            onChange={(e) => onOptionsChange({ role: e.target.value })} />
          
          </div>
          <div>
            <label className={labelClass} htmlFor="title">
              BUILDER CLASS
            </label>
            <div className="mt-2 flex gap-2">
              <input
              id="title"
              className="w-full rounded-xl border border-goa-cream/20 bg-goa-deep/70 px-4 py-3 font-mono text-sm text-goa-cream placeholder:text-goa-cream/35 outline-none transition focus:border-goa-yellow focus:ring-2 focus:ring-goa-yellow/30"
              value={options.title}
              maxLength={30}
              onChange={(e) => onOptionsChange({ title: e.target.value })} />
            
              <button
              type="button"
              onClick={onShuffleTitle}
              className="shrink-0 rounded-xl border border-goa-cream/25 px-3 text-goa-cream/80 transition hover:border-goa-yellow hover:text-goa-cream"
              aria-label="Generate a new builder class">
              
                <ShuffleIcon className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div> :
      null}

      <div className="mt-6">
        <label className={labelClass} htmlFor="handle">
          X HANDLE (OPTIONAL)
        </label>
        <input
          id="handle"
          className={inputClass}
          value={options.handle}
          maxLength={20}
          placeholder="yourhandle"
          onChange={(e) =>
          onOptionsChange({ handle: e.target.value.replace(/[^\w]/g, '') })
          } />
        
      </div>

      <div className="mt-7 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-goa-cream/30 px-5 py-3.5 font-mono text-xs tracking-[0.2em] text-goa-cream transition hover:border-goa-yellow hover:text-goa-yellow">
          
          <DownloadIcon className="h-4 w-4" aria-hidden />
          DOWNLOAD
        </button>
        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-goa-yellow px-5 py-3.5 font-mono text-xs tracking-[0.2em] text-goa-ink transition hover:brightness-105">
          
          SHARE TO X
        </button>
      </div>

      <p
        className="mt-4 font-mono text-[11px] leading-relaxed text-goa-cream/55"
        role="status"
        aria-live="polite">
        
        {error ?
        <span className="text-goa-pink">{error}</span> :

        status ??
        'Caption and #FrameInGoa come pre-filled. On mobile the image attaches straight to the post.'
        }
      </p>
    </div>);

}