import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Backdrop } from './Backdrop';
import { HangingBulb } from './HangingBulb';
import { TopBar } from './TopBar';
import { PreviewStage } from './PreviewStage';
import { ControlsPanel } from './ControlsPanel';
import { Ticker } from './Ticker';
import { fileToImage } from '../utils/loadImage';
import {
  canvasToBlob,
  downloadBlob,
  isMobileDevice,
  openXCompose } from
'../utils/share';
import { graphicFileName } from '../utils/render';
import { builderTitles, pickBuilderTitle } from '../data/builderTitles';
import {
  initialManifest,
  randomManifest,
  statusLines,
  superpowers } from
'../data/manifest';
import { getTheme } from '../data/frameThemes';
import type {
  Format,
  GraphicOptions,
  Manifest,
  Mode,
  Offset,
  Orientation,
  Side } from
'../types';

const initialOptions: GraphicOptions = {
  img: null,
  zoom: 1,
  offset: { x: 0, y: 0 },
  name: '',
  role: '',
  handle: '',
  title: 'Midnight Shipper',
  themeId: 'susegad',
  trimId: 'ornament',
  manifest: initialManifest
};

const nextFrom = (list: string[], current: string) => {
  let next = current;
  while (next === current && list.length > 1) {
    next = list[Math.floor(Math.random() * list.length)];
  }
  return next;
};

export function Studio() {
  const [mode, setMode] = useState<Mode>(() =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ?
  'dark' :
  'light'
  );
  const [format, setFormat] = useState<Format>('pfp');
  const [orientation, setOrientation] = useState<Orientation>('landscape');
  const [side, setSide] = useState<Side>('front');
  const [options, setOptions] = useState<GraphicOptions>(initialOptions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [shared, setShared] = useState(false);

  const frontRef = useRef<HTMLCanvasElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  const patch = useCallback((next: Partial<GraphicOptions>) => {
    setOptions((prev) => ({ ...prev, ...next }));
  }, []);

  const patchManifest = useCallback((next: Partial<Manifest>) => {
    setOptions((prev) => ({
      ...prev,
      manifest: { ...prev.manifest, ...next }
    }));
  }, []);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setStatus(null);
    setLoading(true);
    try {
      const img = await fileToImage(file);
      setOptions((prev) => ({
        ...prev,
        img,
        zoom: 1,
        offset: { x: 0, y: 0 },
        title: prev.title || pickBuilderTitle(file.name)
      }));
    } catch {
      setError('That file could not be read. Try a JPG, PNG or HEIC photo.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOffset = useCallback((offset: Offset) => {
    setOptions((prev) => ({ ...prev, offset }));
  }, []);

  const handleFormat = useCallback((next: Format) => {
    setFormat(next);
    if (next === 'pfp') setSide('front');
  }, []);

  const spec = useMemo(
    () => ({ format, orientation, side, options }),
    [format, options, orientation, side]
  );

  const fileName = graphicFileName(spec);

  const caption = useMemo(() => {
    if (format === 'pfp') {
      return 'New PFP loaded. See you at Hacker House Goa 2026, 28–31 Oct. #FrameInGoa';
    }
    if (side === 'back') {
      return `${options.manifest.superpower}. ${options.manifest.status} My builder manifest for Hacker House Goa 2026, 28–31 Oct. #FrameInGoa`;
    }
    return `${options.name ? `${options.name} — ` : ''}${
    options.title} at Hacker House Goa 2026, 28–31 Oct. #FrameInGoa`;

  }, [format, options.manifest, options.name, options.title, side]);

  const activeCanvas = () =>
  format === 'id' && side === 'back' ? backRef.current : frontRef.current;

  const handleDownload = useCallback(async () => {
    const canvas = activeCanvas();
    if (!canvas) return;
    setError(null);
    try {
      const blob = await canvasToBlob(canvas);
      downloadBlob(blob, fileName);
      setStatus('Saved as a PNG. Attach it to your post and you are done.');
    } catch {
      setError('Export failed — try again.');
    }
  }, [fileName, format, side]);

  const handleShare = useCallback(async () => {
    const canvas = activeCanvas();
    if (!canvas) return;
    setError(null);
    setShared(true);

    try {
      if (isMobileDevice()) {
        const blob = await canvasToBlob(canvas);
        downloadBlob(blob, fileName);
        openXCompose(caption);
        setStatus(
          'Opening X with your caption ready — attach the PNG that just saved.'
        );
        return;
      }
      openXCompose(caption);
      const blob = await canvasToBlob(canvas);
      downloadBlob(blob, fileName);
      setStatus(
        'X opened in a new tab with the caption filled in. Attach the PNG that just saved.'
      );
    } catch {
      setError('Export failed — download the image and post it manually.');
    }
  }, [caption, fileName, format, side]);

  const step = options.img ? shared ? 3 : 2 : 1;
  const themeLabel = getTheme(options.themeId).label.toUpperCase();

  return (
    <div className="goa-stripes relative w-full bg-page lg:h-screen lg:overflow-hidden">
      <Backdrop mode={mode} />
      <HangingBulb
        mode={mode}
        onToggle={() => setMode(mode === 'light' ? 'dark' : 'light')} />
      

      <main className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col px-4 pb-6 pt-4 sm:px-6 lg:h-full">
        <TopBar mode={mode} onModeChange={setMode} step={step} />

        <div className="mt-3 grid gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_368px] xl:grid-cols-[minmax(0,1fr)_400px]">
          <PreviewStage
            format={format}
            orientation={orientation}
            side={side}
            options={options}
            themeLabel={themeLabel}
            frontRef={frontRef}
            backRef={backRef}
            onOffsetChange={handleOffset}
            onSideChange={setSide}
            onOrientationChange={setOrientation} />
          

          <ControlsPanel
            format={format}
            onFormatChange={handleFormat}
            orientation={orientation}
            onOrientationChange={setOrientation}
            side={side}
            onSideChange={setSide}
            options={options}
            onOptionsChange={patch}
            onManifestChange={patchManifest}
            onFile={handleFile}
            onReset={() => patch({ zoom: 1, offset: { x: 0, y: 0 } })}
            onShuffleTitle={() =>
            patch({ title: nextFrom(builderTitles, options.title) })
            }
            onShuffleSuperpower={() =>
            patchManifest({
              superpower: nextFrom(superpowers, options.manifest.superpower)
            })
            }
            onShuffleStatus={() =>
            patchManifest({
              status: nextFrom(statusLines, options.manifest.status)
            })
            }
            onRandomizeManifest={() =>
            patch({ manifest: randomManifest(options.manifest) })
            }
            onDownload={handleDownload}
            onShare={handleShare}
            loading={loading}
            error={error}
            status={status} />
          
        </div>

        <Ticker />
      </main>
    </div>);

}