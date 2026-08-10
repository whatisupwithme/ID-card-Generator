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

export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /android|iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function xWebIntent(caption: string): string {
  const params = new URLSearchParams({ text: caption, url: SHARE_URL });
  return `https://x.com/intent/post?${params.toString()}`;
}

function xAppLink(caption: string): string {
  return `twitter://post?message=${encodeURIComponent(
    `${caption} ${SHARE_URL}`
  )}`;
}

/**
 * Opens X itself with the caption pre-filled — never the OS share sheet.
 * On phones it tries the installed app first and falls back to x.com if the
 * app never takes over; on desktop it goes straight to x.com in a new tab.
 * Must be called synchronously from the click handler so popups aren't blocked.
 */
export function openXCompose(caption: string): 'app' | 'web' {
  const web = xWebIntent(caption);

  if (!isMobileDevice()) {
    window.open(web, '_blank', 'noopener,noreferrer');
    return 'web';
  }

  let handedOff = false;
  const onHide = () => {
    if (document.visibilityState === 'hidden') handedOff = true;
  };
  document.addEventListener('visibilitychange', onHide);

  window.location.href = xAppLink(caption);

  window.setTimeout(() => {
    document.removeEventListener('visibilitychange', onHide);
    if (!handedOff && document.visibilityState === 'visible') {
      window.location.href = web;
    }
  }, 900);

  return 'app';
}