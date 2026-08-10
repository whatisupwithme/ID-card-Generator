/** Converts any user-supplied photo (incl. iPhone HEIC) into a decoded image. */
export async function fileToImage(file: File): Promise<HTMLImageElement> {
  let blob: Blob = file;
  const isHeic =
  /heic|heif/i.test(file.type) || /\.(heic|heif)$/i.test(file.name);

  if (isHeic) {
    const heic2any = (await import('heic2any')).default as (opts: {
      blob: Blob;
      toType?: string;
      quality?: number;
    }) => Promise<Blob | Blob[]>;
    const converted = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.92
    });
    blob = Array.isArray(converted) ? converted[0] : converted;
  }

  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Could not read that image.'));
      el.src = url;
    });
    if (typeof img.decode === 'function') {
      try {
        await img.decode();
      } catch {

        /* already loaded */}
    }
    return img;
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
}