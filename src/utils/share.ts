export const SHARE_URL = 'https://hhgoa.com';

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);else
      reject(new Error('Could not export the image.'));
    }, 'image/png');
  });
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export function tweetIntent(text: string): string {
  const params = new URLSearchParams({ text, url: SHARE_URL });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export type ShareResult = 'native' | 'intent';

/**
 * Uses the native share sheet (attaches the real image on mobile) and falls
 * back to downloading the file + opening a pre-filled tweet on desktop.
 */
export async function shareGraphic(
canvas: HTMLCanvasElement,
fileName: string,
caption: string)
: Promise<ShareResult> {
  const blob = await canvasToBlob(canvas);
  const file = new File([blob], fileName, { type: 'image/png' });

  const nav = navigator as Navigator & {
    canShare?: (data: ShareData) => boolean;
    share?: (data: ShareData) => Promise<void>;
  };

  if (nav.canShare?.({ files: [file] }) && nav.share) {
    try {
      await nav.share({ files: [file], text: caption });
      return 'native';
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return 'native';
    }
  }

  downloadBlob(blob, fileName);
  window.open(tweetIntent(caption), '_blank', 'noopener,noreferrer');
  return 'intent';
}