// lib/imageCompression.ts
export type CompressOptions = {
  maxDimension?: number;
  targetMaxBytes?: number;
  mimeType?: "image/webp" | "image/jpeg";
  quality?: number; // 0..1
};

const loadBitmap = async (file: File | Blob) => {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return await createImageBitmap(file);
  }
};

const drawToCanvas = (bmp: ImageBitmap, maxDim: number) => {
  const scale = Math.min(1, maxDim / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale);
  const h = Math.round(bmp.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bmp, 0, 0, w, h);
  return canvas;
};

const canvasToBlob = (c: HTMLCanvasElement, type: string, q?: number) =>
  new Promise<Blob | null>((res) => c.toBlob(res, type, q));

export async function compressImage(
  file: File,
  {
    maxDimension = 1600,
    targetMaxBytes,
    mimeType = "image/webp",
    quality = 0.9,
  }: CompressOptions = {},
): Promise<{ blob: Blob; mime: string; ext: "webp" | "jpg" }> {
  const bmp = await loadBitmap(file);
  const canvas = drawToCanvas(bmp, maxDimension);

  let q = quality;
  let outType = mimeType;
  let blob = await canvasToBlob(canvas, outType, q);

  if (!blob) {
    // fallback if webp not supported
    outType = "image/jpeg";
    blob = await canvasToBlob(canvas, outType, q);
  }

  if (targetMaxBytes && blob && blob.size > targetMaxBytes) {
    while (q > 0.4) {
      q = Math.max(0.4, q - 0.1);
      const trial = await canvasToBlob(canvas, outType, q);
      if (trial && trial.size < blob.size) blob = trial;
      if (blob.size <= targetMaxBytes) break;
    }
  }

  bmp.close();
  return {
    blob: blob!,
    mime: outType,
    ext: outType === "image/webp" ? "webp" : "jpg",
  };
}
