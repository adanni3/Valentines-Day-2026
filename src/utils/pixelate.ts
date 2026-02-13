/**
 * Pixel Art Processing Utility
 * Based on PIXELME JavaFX application logic
 * Features:
 * - 16-color palette optimized for skin tones
 * - 8x8 Bayer Matrix Ordered Dithering
 * - Histogram Adjustment (contrast, brightness, saturation)
 * - Weighted Color Matching (perceptual weights: 0.3, 0.59, 0.11)
 * - CRT Scanlines
 */

// 16-color palette optimized for skin tones
const PIXELME_16 = [
  [26, 28, 44],     // 0: Darkest Shadow (Black/Blue)
  [63, 50, 174],    // 1: Deep Blue (Shadow Accent)
  [110, 78, 35],    // 2: Dark Brown (Hair/Glasses)
  [141, 85, 36],    // 3: Rich Brown (Mid-Shadow)
  [198, 134, 66],   // 4: Tan (Skin Mid-tone)
  [224, 172, 105],  // 5: Golden (Skin Base)
  [241, 194, 125],  // 6: Peach (Skin Highlight)
  [255, 219, 172],  // 7: Pale (Lightest Skin)
  [255, 255, 255],  // 8: Pure White (Eye/Teeth glint)
  [122, 36, 61],    // 9: Deep Red (Lips/Detail)
  [255, 148, 157],  // 10: Pink (Highlight/Cheeks)
  [56, 183, 100],   // 11: Emerald Green (BG/Vibrant)
  [41, 173, 255],   // 12: Sky Blue (BG/Vibrant)
  [171, 82, 54],    // 13: Brick Red (Shadow Warmth)
  [95, 87, 79],     // 14: Neutral Gray (Clothing/Metal)
  [194, 195, 199]   // 15: Light Gray (Highlight/Clothing)
];

// 8x8 Bayer Matrix for ordered dithering
const BAYER_MATRIX = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21]
];

// Perceptual weights for weighted color matching
const W_R = 0.3;
const W_G = 0.59;
const W_B = 0.11;

export interface PixelateOptions {
  pixelSize?: number;
  contrast?: number;
  brightness?: number;
  saturation?: number;
  dithering?: boolean;
  scanlines?: boolean;
  outputSize?: number; // 0 = keep original size
}

export async function pixelateImage(
  imageUrl: string,
  options: PixelateOptions = {}
): Promise<string> {
  const {
    pixelSize = 8,
    contrast = 0.4,
    brightness = -0.1,
    saturation = 0.5,
    dithering = true,
    scanlines = true,
    outputSize = 0 // 0 = keep original size
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Calculate dimensions
      let canvasWidth: number;
      let canvasHeight: number;
      const aspectRatio = img.width / img.height;

      // If outputSize is 0, keep original size
      if (outputSize === 0) {
        canvasWidth = img.width;
        canvasHeight = img.height;
      } else {
        canvasWidth = outputSize;
        canvasHeight = outputSize / aspectRatio;

        if (canvasHeight > canvasWidth) {
          canvasHeight = canvasWidth;
          canvasWidth = canvasWidth * aspectRatio;
        }
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Draw image
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      // Get image data
      let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

      // Step 1: Histogram Adjustment
      imageData = applyHistogramAdjustment(imageData, contrast, brightness, saturation);

      // Step 2: Pixelate with weighted color matching
      imageData = pixelateWithWeightedMatching(imageData, pixelSize);

      // Step 3: Bayer Matrix Ordered Dithering
      if (dithering) {
        imageData = applyBayerDithering(imageData);
      }

      // Step 4: CRT Scanlines
      if (scanlines) {
        imageData = applyCRTScanlines(imageData);
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = (error) => reject(error);
    img.src = imageUrl;
  });
}

function applyHistogramAdjustment(
  imageData: ImageData,
  contrast: number,
  brightness: number,
  saturation: number
): ImageData {
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i] / 255;
    let g = data[i + 1] / 255;
    let b = data[i + 2] / 255;

    // Apply contrast
    r = (r - 0.5) * (1 + contrast) + 0.5;
    g = (g - 0.5) * (1 + contrast) + 0.5;
    b = (b - 0.5) * (1 + contrast) + 0.5;

    // Apply brightness
    r += brightness;
    g += brightness;
    b += brightness;

    // Apply saturation
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    r = gray + (r - gray) * (1 + saturation);
    g = gray + (g - gray) * (1 + saturation);
    b = gray + (b - gray) * (1 + saturation);

    // Clamp values
    r = Math.max(0, Math.min(1, r));
    g = Math.max(0, Math.min(1, g));
    b = Math.max(0, Math.min(1, b));

    data[i] = Math.round(r * 255);
    data[i + 1] = Math.round(g * 255);
    data[i + 2] = Math.round(b * 255);
  }

  return imageData;
}

function pixelateWithWeightedMatching(imageData: ImageData, pixelSize: number): ImageData {
  const { width, height, data } = imageData;
  const output = new ImageData(width, height);
  const outputData = output.data;

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      // Calculate average color of block
      let avgR = 0, avgG = 0, avgB = 0;
      let pixelCount = 0;

      for (let blockY = 0; blockY < pixelSize; blockY++) {
        for (let blockX = 0; blockX < pixelSize; blockX++) {
          const pixelX = x + blockX;
          const pixelY = y + blockY;

          if (pixelX < width && pixelY < height) {
            const idx = (pixelY * width + pixelX) * 4;
            avgR += data[idx];
            avgG += data[idx + 1];
            avgB += data[idx + 2];
            pixelCount++;
          }
        }
      }

      if (pixelCount > 0) {
        avgR /= pixelCount;
        avgG /= pixelCount;
        avgB /= pixelCount;

        // Find closest palette color using weighted distance
        const closest = findClosestPaletteColorWeighted(avgR, avgG, avgB);

        // Fill block with palette color
        for (let blockY = 0; blockY < pixelSize; blockY++) {
          for (let blockX = 0; blockX < pixelSize; blockX++) {
            const pixelX = x + blockX;
            const pixelY = y + blockY;

            if (pixelX < width && pixelY < height) {
              const idx = (pixelY * width + pixelX) * 4;
              outputData[idx] = closest[0];
              outputData[idx + 1] = closest[1];
              outputData[idx + 2] = closest[2];
              outputData[idx + 3] = data[idx + 3]; // Alpha
            }
          }
        }
      }
    }
  }

  return output;
}

function findClosestPaletteColorWeighted(r: number, g: number, b: number): number[] {
  let closest = PIXELME_16[0];
  let minDistance = weightedColorDistance(r, g, b, closest);

  for (let i = 1; i < PIXELME_16.length; i++) {
    const distance = weightedColorDistance(r, g, b, PIXELME_16[i]);
    if (distance < minDistance) {
      minDistance = distance;
      closest = PIXELME_16[i];
    }
  }

  return closest;
}

function weightedColorDistance(r1: number, g1: number, b1: number, [r2, g2, b2]: number[]): number {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return W_R * dr * dr + W_G * dg * dg + W_B * db * db;
}

function applyBayerDithering(imageData: ImageData): ImageData {
  const { width, height, data } = imageData;
  const output = new ImageData(width, height);
  const outputData = output.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Calculate luminance
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

      // Get Bayer threshold for this position
      const threshold = BAYER_MATRIX[y % 8][x % 8];
      const thresholdNormalized = threshold / 64.0;

      // Apply dithering threshold to luminance
      const adjustedLuminance = luminance - thresholdNormalized + 0.5;

      // Find closest palette color with dithering offset
      let closest = PIXELME_16[0];
      let minDist = Infinity;

      for (const paletteColor of PIXELME_16) {
        const dr = r - paletteColor[0];
        const dg = g - paletteColor[1];
        const db = b - paletteColor[2];
        const dither = (adjustedLuminance - luminance) * 0.3;
        const dist = W_R * dr * dr + W_G * dg * dg + W_B * db * db + dither * dither;

        if (dist < minDist) {
          minDist = dist;
          closest = paletteColor;
        }
      }

      outputData[idx] = closest[0];
      outputData[idx + 1] = closest[1];
      outputData[idx + 2] = closest[2];
      outputData[idx + 3] = data[idx + 3];
    }
  }

  return output;
}

function applyCRTScanlines(imageData: ImageData): ImageData {
  const { width, height, data } = imageData;
  const output = new ImageData(width, height);
  const outputData = output.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (y % 2 === 0) {
        // Every even scanline darkened by 10%
        outputData[idx] = Math.round(data[idx] * 0.9);
        outputData[idx + 1] = Math.round(data[idx + 1] * 0.9);
        outputData[idx + 2] = Math.round(data[idx + 2] * 0.9);
        outputData[idx + 3] = data[idx + 3];
      } else {
        outputData[idx] = data[idx];
        outputData[idx + 1] = data[idx + 1];
        outputData[idx + 2] = data[idx + 2];
        outputData[idx + 3] = data[idx + 3];
      }
    }
  }

  return output;
}

/**
 * Quick simple pixelation (CSS-style) - faster but less accurate
 */
export function quickPixelate(canvas: HTMLCanvasElement, pixelSize: number = 8): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // Disable smoothing for pixelated effect
  ctx.imageSmoothingEnabled = false;

  // Draw smaller then scale up
  const smallWidth = Math.ceil(width / pixelSize);
  const smallHeight = Math.ceil(height / pixelSize);

  // Create temporary canvas for downscaling
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = smallWidth;
  tempCanvas.height = smallHeight;
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return;

  tempCtx.drawImage(canvas, 0, 0, smallWidth, smallHeight);

  // Clear and draw scaled back up
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(tempCanvas, 0, 0, smallWidth, smallHeight, 0, 0, width, height);
}
