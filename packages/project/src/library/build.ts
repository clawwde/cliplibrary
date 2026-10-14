import type { EasingId } from '@cliplibrary/schemas';
import type { Animation, AnimationKind } from '../animation';
import type { Element, ImageElement, ShapeElement, TextElement } from '../element';
import { createImageElement, createShapeElement, createTextElement } from '../factories';
import type { Project } from '../project';
import type { Track } from '../track';

export const SANS = 'Inter, system-ui, sans-serif';
export const SERIF = 'Georgia, "Times New Roman", serif';
export const MONO = 'ui-monospace, "SF Mono", Menlo, monospace';

export const anim = (
  kind: AnimationKind,
  durationInFrames: number,
  easing: EasingId = 'easeOut',
): Animation => ({ kind, easing, durationInFrames });

export const text = (id: string, content: string, over: Partial<TextElement> = {}): TextElement =>
  createTextElement({ id, content, fontFamily: SANS, ...over });

export const rect = (id: string, over: Partial<ShapeElement> = {}): ShapeElement =>
  createShapeElement('rect', { id, ...over });

export const ellipse = (id: string, over: Partial<ShapeElement> = {}): ShapeElement =>
  createShapeElement('ellipse', { id, ...over });

export const image = (id: string, src: string, over: Partial<ImageElement> = {}): ImageElement =>
  createImageElement({ id, src, ...over });

export const layer = (id: string, name: string, elements: Element[]): Track => ({
  id,
  name,
  elements,
});

interface SceneOptions {
  width?: number;
  height?: number;
  fps?: number;
  durationInFrames: number;
  background: string;
  tracks: Track[];
}

export const scene = (options: SceneOptions): Project => ({
  fps: options.fps ?? 30,
  width: options.width ?? 1920,
  height: options.height ?? 1080,
  durationInFrames: options.durationInFrames,
  background: options.background,
  tracks: options.tracks,
});
