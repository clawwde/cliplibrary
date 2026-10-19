import { useMemo } from 'react';
import * as THREE from 'three';
import { configureTexture, FONT_PX, fontOf, textMetrics, useKineticWeight } from './word-art';

const SPHERE_WIDTH = 4096;
const SPHERE_HEIGHT = 2048;
const RING_HEIGHT = 256;
const RING_MAX_WIDTH = 8192;

export interface GlobeWord {
  text: string;
  color: string;
}

const paintGlobe = (words: GlobeWord[], weight: number, arc: number, band: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = SPHERE_WIDTH;
  canvas.height = SPHERE_HEIGHT;
  const context = canvas.getContext('2d');
  if (context === null || words.length === 0) {
    return canvas;
  }
  const { ascent, descent, measure } = textMetrics(weight);
  const bandPixels = (SPHERE_HEIGHT * band) / 180;
  const arcPixels = (SPHERE_WIDTH * Math.min(arc, 360 / words.length - 6)) / 360;
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  const widest = Math.max(1, ...words.map((word) => measure(word.text)));
  const scale = Math.min(bandPixels / (ascent + descent), arcPixels / widest);
  const size = FONT_PX * scale;
  words.forEach((word, index) => {
    context.font = fontOf(weight, size);
    context.fillStyle = word.color;
    const center = (0.25 + index / words.length) * SPHERE_WIDTH;
    const baseline = SPHERE_HEIGHT / 2 + ((ascent - descent) / 2) * scale;
    for (const offset of [-SPHERE_WIDTH, 0, SPHERE_WIDTH]) {
      context.fillText(word.text, center + offset, baseline);
    }
  });
  return canvas;
};

export const useGlobeTexture = (
  words: GlobeWord[],
  weight: number,
  arc: number,
  band: number,
): THREE.CanvasTexture => {
  useKineticWeight(weight);
  const key = JSON.stringify({ words, weight, arc, band });
  return useMemo(() => {
    const parsed = JSON.parse(key) as { words: GlobeWord[] };
    const texture = configureTexture(
      new THREE.CanvasTexture(paintGlobe(parsed.words, weight, arc, band)),
    );
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }, [key, weight, arc, band]);
};

const SEPARATOR = '   •   ';

const paintRing = (text: string, color: string, weight: number, aspect: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = Math.min(RING_MAX_WIDTH, Math.max(RING_HEIGHT, Math.round(aspect * RING_HEIGHT)));
  canvas.height = RING_HEIGHT;
  const context = canvas.getContext('2d');
  if (context === null || text.trim().length === 0) {
    return canvas;
  }
  const { ascent, descent, measure } = textMetrics(weight);
  const scale = (RING_HEIGHT * 0.72) / (ascent + descent);
  const pattern = `${text}${SEPARATOR}`;
  const patternWidth = measure(pattern) * scale;
  const repeats = Math.max(1, Math.round(canvas.width / patternWidth));
  const stretch = canvas.width / (repeats * patternWidth);
  context.font = fontOf(weight, FONT_PX * scale);
  context.fillStyle = color;
  context.textBaseline = 'alphabetic';
  context.setTransform(stretch, 0, 0, 1, 0, 0);
  const baseline = RING_HEIGHT / 2 + ((ascent - descent) / 2) * scale;
  for (let repeat = 0; repeat < repeats; repeat++) {
    context.fillText(pattern, repeat * patternWidth, baseline);
  }
  return canvas;
};

export const useRingTexture = (
  text: string,
  color: string,
  weight: number,
  aspect: number,
): THREE.CanvasTexture => {
  useKineticWeight(weight);
  const roundedAspect = Math.round(aspect * 10) / 10;
  return useMemo(() => {
    const texture = configureTexture(
      new THREE.CanvasTexture(paintRing(text, color, weight, roundedAspect)),
    );
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }, [text, color, weight, roundedAspect]);
};
