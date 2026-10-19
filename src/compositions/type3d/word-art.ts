import { useMemo } from 'react';
import * as THREE from 'three';
import { kineticFont, kineticFontReady } from '../promo/fonts';

const FONT_PX = 200;

type WordShape = 'none' | 'pill' | 'circle';

export interface WordArt {
  text: string;
  color: string;
  weight: number;
  shape?: WordShape;
  fill?: string;
  stroke?: string;
  shadow?: number;
}

export interface WordTexture {
  texture: THREE.CanvasTexture;
  aspect: number;
  frameX: number;
  frameY: number;
}

const loadedWeights = new Set<number>();
const pendingWeights = new Map<number, Promise<void>>();

const useKineticWeight = (weight: number): void => {
  if (loadedWeights.has(weight)) {
    return;
  }
  const pending =
    pendingWeights.get(weight) ??
    kineticFontReady()
      .then(() => document.fonts.load(`${weight} ${FONT_PX}px "${kineticFont}"`))
      .then(() => {
        loadedWeights.add(weight);
      });
  pendingWeights.set(weight, pending);
  throw pending;
};

const fontOf = (weight: number, px = FONT_PX) => `${weight} ${px}px "${kineticFont}"`;

let sharedContext: CanvasRenderingContext2D | null = null;

const measureContext = (): CanvasRenderingContext2D => {
  sharedContext ??= document.createElement('canvas').getContext('2d');
  if (sharedContext === null) {
    throw new Error('2d canvas unavailable');
  }
  return sharedContext;
};

const textMetrics = (weight: number) => {
  const context = measureContext();
  context.font = fontOf(weight);
  const ascent = context.measureText('H').actualBoundingBoxAscent;
  const descent = context.measureText('gy').actualBoundingBoxDescent;
  return { ascent, descent, measure: (text: string) => context.measureText(text).width };
};

const configureTexture = <T extends THREE.Texture>(texture: T): T => {
  texture.colorSpace = THREE.NoColorSpace;
  texture.anisotropy = 16;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.premultiplyAlpha = true;
  texture.needsUpdate = true;
  return texture;
};

const ARROW = '->';
const SPARK = '*';

const drawGlyph = (
  context: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  baseline: number,
  middle: number,
  size: number,
) => {
  if (text === ARROW) {
    const arm = size * 0.26;
    context.lineWidth = size * 0.075;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.beginPath();
    context.moveTo(centerX - arm, middle + arm);
    context.lineTo(centerX + arm, middle - arm);
    context.moveTo(centerX - arm * 0.35, middle - arm);
    context.lineTo(centerX + arm, middle - arm);
    context.lineTo(centerX + arm, middle + arm * 0.35);
    context.stroke();
    return;
  }
  if (text === SPARK) {
    context.lineWidth = size * 0.045;
    context.lineCap = 'round';
    context.beginPath();
    for (let ray = 0; ray < 12; ray++) {
      const angle = (ray / 12) * Math.PI * 2;
      context.moveTo(
        centerX + Math.cos(angle) * size * 0.06,
        middle + Math.sin(angle) * size * 0.06,
      );
      context.lineTo(centerX + Math.cos(angle) * size * 0.3, middle + Math.sin(angle) * size * 0.3);
    }
    context.stroke();
    return;
  }
  context.fillText(text, centerX, baseline);
};

const measureWord = (art: WordArt) => {
  const shape = art.shape ?? 'none';
  const { ascent, descent, measure } = textMetrics(art.weight);
  const isGlyph = art.text === ARROW || art.text === SPARK;
  const textWidth = isGlyph ? FONT_PX * 0.7 : measure(art.text);
  const boxHeight = shape === 'none' ? ascent + descent : FONT_PX * 1.32;
  const contentWidth =
    shape === 'pill'
      ? textWidth + FONT_PX * 0.84
      : shape === 'circle'
        ? Math.max(boxHeight, textWidth + FONT_PX * 0.5)
        : textWidth;
  const contentHeight = shape === 'circle' ? contentWidth : boxHeight;
  const margin = (art.shadow ?? 0) > 0 ? FONT_PX * 0.4 : FONT_PX * 0.08;
  return { shape, ascent, descent, contentWidth, contentHeight, margin };
};

const paintWord = (art: WordArt): Omit<WordTexture, 'texture'> & { canvas: HTMLCanvasElement } => {
  const { shape, ascent, descent, contentWidth, contentHeight, margin } = measureWord(art);
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(contentWidth + margin * 2);
  canvas.height = Math.ceil(contentHeight + margin * 2);
  const context = canvas.getContext('2d');
  if (context !== null) {
    const left = (canvas.width - contentWidth) / 2;
    const top = (canvas.height - contentHeight) / 2;
    if (shape !== 'none') {
      const radius = contentHeight / 2;
      context.beginPath();
      context.roundRect(left, top, contentWidth, contentHeight, radius);
      if (art.fill !== undefined) {
        context.save();
        context.shadowColor = `rgba(0, 0, 0, ${art.shadow ?? 0})`;
        context.shadowBlur = FONT_PX * 0.22;
        context.shadowOffsetY = FONT_PX * 0.08;
        context.fillStyle = art.fill;
        context.fill();
        context.restore();
      }
      if (art.stroke !== undefined) {
        const line = FONT_PX * 0.035;
        context.beginPath();
        context.roundRect(
          left + line / 2,
          top + line / 2,
          contentWidth - line,
          contentHeight - line,
          radius - line / 2,
        );
        context.lineWidth = line;
        context.strokeStyle = art.stroke;
        context.stroke();
      }
    }
    context.font = fontOf(art.weight);
    context.textAlign = 'center';
    context.textBaseline = 'alphabetic';
    context.fillStyle = art.color;
    context.strokeStyle = art.color;
    const middle = top + contentHeight / 2;
    const baseline = middle + (ascent - descent) / 2 + (shape === 'none' ? 0 : descent * 0.18);
    drawGlyph(context, art.text, left + contentWidth / 2, baseline, middle, FONT_PX);
  }
  return {
    canvas,
    aspect: contentWidth / contentHeight,
    frameX: canvas.width / contentWidth,
    frameY: canvas.height / contentHeight,
  };
};

export const useWordTexture = (art: WordArt): WordTexture => {
  useKineticWeight(art.weight);
  const key = JSON.stringify(art);
  return useMemo(() => {
    const painted = paintWord(JSON.parse(key) as WordArt);
    return {
      texture: configureTexture(new THREE.CanvasTexture(painted.canvas)),
      aspect: painted.aspect,
      frameX: painted.frameX,
      frameY: painted.frameY,
    };
  }, [key]);
};

export const wordAspect = (art: WordArt): number => {
  useKineticWeight(art.weight);
  const { contentWidth, contentHeight } = measureWord(art);
  return contentWidth / contentHeight;
};
