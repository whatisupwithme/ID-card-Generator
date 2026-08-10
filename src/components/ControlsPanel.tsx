import React from 'react';
import {
  CircleUserIcon,
  CreditCardIcon,
  DownloadIcon,
  MonitorIcon,
  SmartphoneIcon } from
'lucide-react';
import { Segmented } from './ui/Segmented';
import { PhotoControls } from './PhotoControls';
import { ThemePicker } from './ThemePicker';
import { FrontFields } from './FrontFields';
import { ManifestFields } from './ManifestFields';
import type { TrimKind } from '../data/frameThemes';
import type {
  Format,
  GraphicOptions,
  Manifest,
  Orientation,
  Side } from
'../types';

type Props = {
  format: Format;
  onFormatChange: (format: Format) => void;
  orientation: Orientation;
  onOrientationChange: (orientation: Orientation) => void;
  side: Side;
  onSideChange: (side: Side) => void;
  options: GraphicOptions;
  onOptionsChange: (patch: Partial<GraphicOptions>) => void;
  onManifestChange: (patch: Partial<Manifest>) => void;
  onFile: (file: File) => void;
  onReset: () => void;
  onShuffleTitle: () => void;
  onShuffleSuperpower: () => void;
  onShuffleStatus: () => void;
  onRandomizeManifest: () => void;
  onDownload: () => void;
  onShare: () => void;
  loading: boolean;
  error: string | null;
  status: string | null;
};

export function ControlsPanel({
  format,
  onFormatChange,
  orientation,
  onOrientationChange,
  side,
  onSideChange,
  options,
  onOptionsChange,
  onManifestChange,
  onFile,
  onReset,
  onShuffleTitle,
  onShuffleSuperpower,
  onShuffleStatus,
  onRandomizeManifest,
  onDownload,
  onShare,
  loading,
  error,
  status
}: Props) {
  const editingBack = format === 'id' && side === 'back';

  return (
    <aside className="flex flex-col rounded-3xl border border-line bg-panel lg:h-full lg:min-h-0">
      <div className="space-y-2 border-b border-line p-3">
        <Segmented
          ariaLabel="Graphic format"
          value={format}
          onChange={onFormatChange}
          options={[
          {
            value: 'pfp',
            label: 'PFP FRAME',
            icon: <CircleUserIcon className="h-3.5 w-3.5" aria-hidden="true" />
          },
          {
            value: 'id',
            label: 'BUILDER ID',
            icon: <CreditCardIcon className="h-3.5 w-3.5" aria-hidden="true" />
          }]
          } />
        
        {format === 'id' ?
        <div className="grid grid-cols-2 gap-2">
            <Segmented
            compact
            ariaLabel="Card orientation"
            value={orientation}
            onChange={onOrientationChange}
            options={[
            {
              value: 'landscape',
              label: 'LANDSCAPE',
              icon: <MonitorIcon className="h-3 w-3" aria-hidden="true" />
            },
            {
              value: 'portrait',
              label: 'PORTRAIT',
              icon: <SmartphoneIcon className="h-3 w-3" aria-hidden="true" />
            }]
            } />
          
            <Segmented
            compact
            ariaLabel="Card side"
            value={side}
            onChange={onSideChange}
            options={[
            { value: 'front', label: 'FRONT' },
            { value: 'back', label: 'MANIFEST' }]
            } />
          
          </div> :
        null}
      </div>

      <div className="thin-scroll space-y-4 p-3 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        {editingBack ?
        <ManifestFields
          manifest={options.manifest}
          onChange={onManifestChange}
          onShuffleSuperpower={onShuffleSuperpower}
          onShuffleStatus={onShuffleStatus}
          onRandomize={onRandomizeManifest} /> :


        <>
            <PhotoControls
            hasImage={Boolean(options.img)}
            zoom={options.zoom}
            loading={loading}
            onFile={onFile}
            onZoomChange={(zoom) => onOptionsChange({ zoom })}
            onReset={onReset} />
          
            <ThemePicker
            themeId={options.themeId}
            trimId={options.trimId}
            onThemeChange={(themeId) => onOptionsChange({ themeId })}
            onTrimChange={(trimId: TrimKind) => onOptionsChange({ trimId })} />
          
            <FrontFields
            format={format}
            options={options}
            onChange={onOptionsChange}
            onShuffleTitle={onShuffleTitle} />
          
          </>
        }
      </div>

      <div className="border-t border-line p-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-ink transition hover:border-accent">
            
            <DownloadIcon className="h-4 w-4" aria-hidden="true" />
            DOWNLOAD
          </button>
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-accentInk transition hover:brightness-105">
            
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true">
              
              <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.63l-5.2-6.8-5.94 6.8H1.74l7.52-8.6L1.1 2.25h6.8l4.71 6.23 5.63-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
            </svg>
            POST ON X
          </button>
        </div>
        <p
          className="mt-2 font-mono text-[10px] leading-relaxed text-inkSoft"
          role="status"
          aria-live="polite">
          
          {error ?
          <span className="text-pop">{error}</span> :

          status ??
          'Post on X opens the X app (or x.com) with your caption already written.'
          }
        </p>
      </div>
    </aside>);

}