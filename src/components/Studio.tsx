import React, { useCallback, useRef, useState } from 'react';
import { Header } from './Header';
import { ControlsPanel } from './ControlsPanel';
import { PreviewStage } from './PreviewStage';
import { fileToImage } from '../utils/loadImage';
import { canvasToBlob, downloadBlob, shareGraphic } from '../utils/share';
import { builderTitles, pickBuilderTitle } from '../data/builderTitles';
import type { Format, GraphicOptions, Offset } from '../types';

const initialOptions: GraphicOptions = {
  img: null,
  zoom: 1,
  offset: { x: 0, y: 0 },
  name: '',
  role: '',
  handle: '',
  title: 'Midnight Shipper'
};

export function Studio() {
  const [format, setFormat] = useState<Format>('pfp');
  const [options, setOptions] = useState<GraphicOptions>(initialOptions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const patch = useCallback((next: Partial<GraphicOptions>) => {
    setOptions((prev) => ({ ...prev, ...next }));
  }, []);

  const handleFile = useCallback(
    async (file: File) => {
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
    },
    []
  );

  const handleOffset = useCallback((offset: Offset) => {
    setOptions((prev) => ({ ...prev, offset }));
  }, []);

  const shuffleTitle = useCallback(() => {
    setOptions((prev) => {
      let next = prev.title;
      while (next === prev.title) {
        next = builderTitles[Math.floor(Math.random() * builderTitles.length)];
      }
      return { ...prev, title: next };
    });
  }, []);

  const fileName =
  format === 'pfp' ? 'hh-goa-2026-pfp.png' : 'hh-goa-2026-builder-id.png';

  const caption =
  format === 'pfp' ?
  `New PFP loaded. See you at Hacker House Goa 2026, 28–31 Oct. #FrameInGoa` :
  `${options.name ? `${options.name} — ` : ''}${
  options.title} at Hacker House Goa 2026, 28–31 Oct. #FrameInGoa`;


  const handleDownload = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setError(null);
    try {
      const blob = await canvasToBlob(canvas);
      downloadBlob(blob, fileName);
      setStatus('Saved as a PNG. Attach it to your post and you are done.');
    } catch {
      setError('Export failed — try again.');
    }
  }, [fileName]);

  const handleShare = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setError(null);
    try {
      const result = await shareGraphic(canvas, fileName, caption);
      setStatus(
        result === 'native' ?
        'Share sheet opened with the image attached.' :
        'Image downloaded and a pre-filled post opened — attach the PNG and send it.'
      );
    } catch {
      setError('Sharing failed — download the image and post it manually.');
    }
  }, [caption, fileName]);

  return (
    <main className="goa-stripes min-h-screen w-full bg-goa-deep px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <Header />

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <PreviewStage
            format={format}
            options={options}
            canvasRef={canvasRef}
            onOffsetChange={handleOffset} />
          
          <ControlsPanel
            format={format}
            onFormatChange={setFormat}
            options={options}
            onOptionsChange={patch}
            onFile={handleFile}
            onReset={() => patch({ zoom: 1, offset: { x: 0, y: 0 } })}
            onShuffleTitle={shuffleTitle}
            onDownload={handleDownload}
            onShare={handleShare}
            loading={loading}
            error={error}
            status={status} />
          
        </div>

        <footer className="mt-12 border-t border-goa-cream/15 pt-6 text-center font-mono text-[11px] tracking-[0.25em] text-goa-cream/45">
          #FRAMEINGOA · HACKER HOUSE GOA 2026 · 28–31 OCT
        </footer>
      </div>
    </main>);

}