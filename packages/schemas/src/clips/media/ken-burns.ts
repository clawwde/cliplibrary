import { z } from 'zod';
import { zColor, zImage, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const KEN_BURNS_PANS = ['left', 'right', 'up', 'down'] as const;

export const kenBurnsSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  image: zImage(),
  background: zColor(),
  overlay: zColor(),
  color: zColor(),
  pan: z.enum(KEN_BURNS_PANS),
  zoom: zSlider({ min: 1, max: 1.8, step: 0.01 }),
  speed: zSlider({ min: 10, max: 80, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type KenBurnsProps = z.infer<typeof kenBurnsSchema>;

export const kenBurnsDefaults: KenBurnsProps = {
  title: 'Golden hour',
  subtitle: 'a slow drift across the frame',
  image: '',
  background: '#0b0b10',
  overlay: '#05060a',
  color: '#f8fafc',
  pan: 'right',
  zoom: 1.28,
  speed: 30,
  easing: 'easeInOut',
};

export const kenBurnsMeta: ClipMeta = {
  id: 'ken-burns',
  title: 'Ken Burns',
  description:
    'A photo drifts and slowly zooms behind a title that fades up over a gradient scrim, with the zoom amount, pan direction, title speed and curve all adjustable; an empty image renders a neutral placeholder.',
  category: 'media',
  source: 'packages/compositions/src/scenes/media/ken-burns.tsx',
  durationInFrames: 180,
  posterFrame: 150,
  fps: 30,
  width: 1920,
  height: 1080,
};
