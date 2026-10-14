import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const FLIP_AXES = ['x', 'y'] as const;

export const flipCardSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  background: zColor(),
  card: zColor(),
  color: zColor(),
  accent: zColor(),
  axis: z.enum(FLIP_AXES),
  speed: zSlider({ min: 12, max: 90, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type FlipCardProps = z.infer<typeof flipCardSchema>;

export const flipCardDefaults: FlipCardProps = {
  title: 'Flip Card',
  subtitle: 'three dimensional entrance',
  background: '#0b1120',
  card: '#1e293b',
  color: '#f8fafc',
  accent: '#38bdf8',
  axis: 'y',
  speed: 36,
  easing: 'easeInOut',
};

export const flipCardMeta: ClipMeta = {
  id: 'flip-card',
  title: 'Flip Card',
  description:
    'A card rotates in on the axis you pick and lands flat facing the camera, with the flip speed and easing curve adjustable.',
  category: 'simple',
  source: 'packages/compositions/src/scenes/simple/flip-card.tsx',
  durationInFrames: 120,
  posterFrame: 100,
  fps: 30,
  width: 1920,
  height: 1080,
};
